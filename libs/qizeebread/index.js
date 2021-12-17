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
  TYPE_ADD_LIQUIDITY,
  SWAP_EXACT_INPUT,
  SWAP_EXACT_OUTPUT,
  MINIMUM_LIQUIDITY,
  BASE_FEE,
  TYPE_APPROVE,
  DOMAIN,
} from '../constants';
import Transaction from '../transaction';
import Fraction from '../fraction';
import { useQrypto } from '../qrypto';
import Token from './token';
import TokenAmount from './token-amount';
import Pair from './pair';
import LiquidityToken from './liquidity-token';

export { Token, TokenAmount, Pair, LiquidityToken };

export class Qizeebread {
  constructor(type) {
    const vm = getCurrentInstance();
    const {
      store: { state },
    } = useContext();
    this.vm = vm;

    this.type = type;
    this.qiAmount = new TokenAmount(Token.QI);
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
    this.txs = computed(() =>
      state.swap.txs.filter((tx) => tx.address === this.account?.address)
    );
    this.tolerance = computed(() => state.swap.tolerance);
    this.connected = computed(() => state.swap.connected);
    this.height = computed(() => state.swap.height);

    // pairs from predefined
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
    this.watchToken();
    this.watchAccount();

    onMounted(() => {
      this.updateBalance(Token.QTUM);
    });
  }

  watchAccount() {
    // update balance if account has been changed
    watch(
      () => this.account,
      (account) => {
        if (account?.loggedIn) {
          this.updateTokens();
        } else {
          this.tokenAmount0.amountSatoshi = BigNumber(0);
          this.tokenAmount1.amountSatoshi = BigNumber(0);
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
  }

  watchToken() {
    // update each token if it changes
    if (!this.account?.network) return;
    this.tokenAmounts.forEach((tokenAmount) => {
      watch(
        () => tokenAmount.token,
        (token) => {
          // tokenAmount.input = ''
          this.updateBalance(token);
          this.updateShouldApprove(token);
        }
      );
    });
    watch(
      () => this.tokens,
      () => {
        this.updateTokens();
      }
    );
  }

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

  changeToken(index, token) {
    this[`tokenAmount${index}`].token = token;
  }

  getReserves() {
    return useQrypto().getReserves(
      this.tokenAmount0.wrappedToken,
      this.tokenAmount1.wrappedToken
    );
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
    console.log('this.qiAmount', this.qiAmount);
    console.log('this.qiAmount', this.qiAmount.amountSatoshi.toString());
    const qrypto = useQrypto();
    try {
      const qiAmount = this.qiAmount;

      const amountIn = this.maximumAmountIn;
      const amountOut = this.minimumAmountOut;

      const to = qrypto.wrapHex(qrypto.hexAddress);
      const method = 'deposit';
      let value = BigNumber(0);
      let params = [0, qiAmount.amountSatoshi.toString(), to]; // pid, amount, to

      const tx = await qrypto.qizeebreadStake(method, params);
      if (tx instanceof Transaction) {
        qrypto.emit('tx', {
          type: TYPE_SWAP,
          raw: tx,
          tokenAmount0,
          tokenAmount1,
        });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('deposit error', e);
    }
  }

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
