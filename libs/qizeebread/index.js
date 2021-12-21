/* eslint-disable */
import {
  reactive,
  computed,
  useContext,
  watch,
  onMounted,
  getCurrentInstance,
} from '@nuxtjs/composition-api';
import BigNumber from 'bignumber.js';
import { useNetwork } from '../utils';
import {
  TYPE_SWAP,
  SWAP_EXACT_INPUT,
  SWAP_EXACT_OUTPUT,
  TYPE_APPROVE,
  DOMAIN,
  TYPE_QIZEEBREAD_STAKE,
} from '../constants';
import { useQrypto } from '../qrypto';
import Token from './token';
import TokenAmount from './token-amount';

export { Token, TokenAmount };

export class Qizeebread {
  constructor(type) {
    const vm = getCurrentInstance();
    const {
      store: { state },
    } = useContext();
    this.vm = vm;

    this.type = type;

    this.tokenAmount0 = new TokenAmount(Token.QTUM);
    this.tokenAmount1 = new TokenAmount(null);
    this.hashStateRoot = '';

    // data from store
    this.account = computed(() => state.swap.account);
    this.tokens = computed(() =>
      state.swap.tokens.filter(
        (token) =>
          token.isQTUM || token.chainId === useNetwork(this.account?.network)
      )
    );
    this.qiToken = Token.QI[useNetwork(this.account?.network)];
    this.qiAmount = new TokenAmount(this.qiToken);
    this.stakedAmount = new TokenAmount(this.qiToken);
  
    this.txs = computed(() =>
      state.swap.txs.filter((tx) => tx.address === this.account?.address)
    );
    this.tolerance = computed(() => state.swap.tolerance);
    this.connected = computed(() => state.swap.connected);
    this.height = computed(() => state.swap.height);

    this.commonTokens = computed(() => {
      return this.tokens.filter((token) => !token.imported);
    });
    this.customTokens = computed(() => {
      return this.tokens.filter((token) => token.imported);
    });
  }

  get tokenAmounts() {
    return [this.tokenAmount0, this.tokenAmount1];
  }

  canProcess() {
    return false;
  }

  get selected() {
    return this.tokenAmount0.selected && this.tokenAmount1.selected;
  }

  get token0() {
    return this.tokenAmount0.token;
  }

  get token1() {
    return this.tokenAmount1.token;
  }

  watchAll() {
    this.watchInput();
    // this.watchToken();
    this.watchAccount();

    onMounted(() => {
      this.qiToken = Token.QI[useNetwork(this.account?.network)];
      this.qiAmount = new TokenAmount(this.qiToken);
      this.stakedAmount = new TokenAmount({ ...this.qiToken });
      this.updateBalance(this.qiToken, true);
    });
  }

  watchAccount() {
    // update balance if account has been changed
    watch(
      () => this.account,
      (account) => {
        if (account?.loggedIn) {
          this.updateBalance(this.qiToken, true);
        } else {
          this.qiAmount.amountSatoshi = BigNumber(0);
        }
      }
    );
  }

  watchInput() {
    // watch when the input changed
    watch(
      () => this.qiAmount.input,
      (input) => {
        const amount = BigNumber(input || 0);
        this.qiAmount.amount = amount;
      }
    );
    watch(
      () => this.stakedAmount.input,
      (input) => {
        const amount = BigNumber(input || 0);
        this.stakedAmount.amount = amount;
      }
    );
  }

  // watchToken() {
  //   // update each token if it changes
  //   if (!this.account?.network) return;
  //   this.tokenAmounts.forEach((tokenAmount) => {
  //     watch(
  //       () => tokenAmount.token,
  //       (token) => {
  //         // tokenAmount.input = ''
  //         this.updateBalance(token);
  //         this.updateShouldApprove(token);
  //       }
  //     );
  //   });
  //   watch(
  //     () => this.tokens,
  //     () => {
  //       this.updateTokens();
  //     }
  //   );
  // }

  async approve(tokenAmount) {
    // console.log('tokenAmount', tokenAmount);
    // const token = tokenAmount.token;
    // this.updateToken(token, {
    //   approving: true,
    // });
    // try {
    //   const tx = await useQrypto().tryToApprove(token, tokenAmount.amount);
    //   if (tx === true) {
    //     this.updateToken(token, {
    //       shouldApprove: false,
    //       approving: false,
    //     });
    //   } else if (tx instanceof Transaction) {
    //     tx.on('confirmed', () => {
    //       this.updateToken(token, {
    //         shouldApprove: false,
    //         approving: false,
    //       });
    //     });
    //   }
    // } catch (e) {
    //   // eslint-disable-next-line no-console
    //   console.warn('approve failed', e);
    // }
    const token = 'eef715b7bb22a7be5ef67052d91bf724aa210b24';
    try {
      const tx = await useQrypto().tryToApproveQizeebread(token, 0);
      console.log('tryToApproveQizeebread', tx);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('approve failed', e);
    }
  }

  async updateShouldApprove(token) {
    let shouldApprove = false;
    let approving = false;
    if (token.isQTUM) {
      shouldApprove = false; 
    } else {
      const tx = this.txs.find(
        (tx) => tx.type === TYPE_APPROVE && tx.token.address === token.address
      );
      if (tx) {
        shouldApprove = tx.raw.confirmations === 0;
        if (shouldApprove) {
          approving = true;
        }
      } else {
        shouldApprove = await useQrypto().shouldApprove(token);
      }
    }
    this.updateToken(token, {
      shouldApprove,
      approving,
    });
  }

  updateToken(token, values) {
    this.vm.proxy.$store.commit('swap/updateToken', { token, values });
  }

  updateTokens() {
    this.tokens.forEach((token) => {
      this.updateBalance(token);
      this.updateShouldApprove(token);
    });
  }

  async updateBalance(token, forceUpdate = false) {
    if (!token) {
      return;
    }
    const balance = await token.getBalance(forceUpdate);

    this.updateToken(token, {
      balanceSatoshi: balance,
    });
  }

  async updateStakedBalance(token) {
    
  }
}

class Exchange extends Qizeebread {
  constructor() {
    super(TYPE_SWAP);

    this.maximumAmountIn = computed(() => {
      if (this.exactInput) {
        return this.tokenAmount0.amountSatoshi;
      }
      return this.tokenAmount0.amountSatoshi
        .times(100 + this.tolerance)
        .div(100)
        .dp(0, BigNumber.ROUND_DOWN);
    });
  }

  get canProcess() {
    return true;
  }

  get swapType() {
    // see if last input is token0 or token1
    return SWAP_EXACT_INPUT;
  }

  get exactInput() {
    return this.swapType === SWAP_EXACT_INPUT;
  }

  get exactOutput() {
    return this.swapType === SWAP_EXACT_OUTPUT;
  }

  async stake() {
    const qrypto = useQrypto();
    try {
      const qiAmount = this.qiAmount;

      const to = qrypto.wrapHex(qrypto.hexAddress);
      const method = 'deposit';
      let params = [0, qiAmount.amountSatoshi.toString(), to]; // pid, amount, to

      const tx = await qrypto.qizeebreadStake(method, params);
      const emptyObject = {};
      if (tx instanceof Transaction) {
        console.log('tx instanceof Transaction');
        qrypto.emit('tx', {
          type: TYPE_QIZEEBREAD_STAKE,
          raw: tx,
          emptyObject,
          emptyObject
        });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('deposit error', e);
    }
  }

  async unstake() {}

  watchAll() {
    super.watchAll();

    watch(
      () => this.height,
      async (height) => {
        if (height > 0) {
          try {
            const { hashStateRoot } = await this.vm.proxy.$axios.$get(
              `https://${
                DOMAIN[useNetwork(this.account?.network)]
              }/api/block/${height}`
            );
            if (this.hashStateRoot !== hashStateRoot) {
              this.hashStateRoot = hashStateRoot;
              this.updateTokens();
            }
          } catch (e) {
            // eslint-disable-next-line no-console
            console.warn(e);
          }
        }
      }
    );
  }
}

export const useExchange = () => {
  const exchange = reactive(new Exchange());
  exchange.watchAll();
  return exchange;
};
