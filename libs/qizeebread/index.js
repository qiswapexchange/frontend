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
  TYPE_QIZEEBREAD_UNSTAKE,
  QIZEEBREAD_QI_PER_BLOCK,
  QTUM_SECONDS_ONE_BLOCK,
  TYPE_QIZEEBREAD_HARVEST,
} from '../constants';
import { useQrypto } from '../qrypto';
import Token from './token';
import TokenAmount from './token-amount';

export { Token, TokenAmount };

const QI_STAKING_POOL_ID = 0;

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
    this.xQiToken = Token.xQI[useNetwork(this.account?.network)];
    this.qiAmount = new TokenAmount(this.qiToken);
    this.stakeAmount = new TokenAmount(this.xQiToken);
    this.pendingQI = BigNumber(0);
    this.apr = BigNumber(0);
  
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
      this.stakeAmount = new TokenAmount(this.xQiToken);
      this.updateBalance(this.qiToken, true);
      this.updateShouldApprove(this.qiToken);
      this.updateStakedBalance(this.xQiToken);
      this.updatePendingQI();
      this.updateAPR();
    });
  }

  watchAccount() {
    // update balance if account has been changed
    watch(
      () => this.account,
      (account) => {
        if (account?.loggedIn) {
          this.updateBalance(this.qiToken, true);
          this.updateShouldApprove(this.qiToken);
          this.updateStakedBalance(this.xQiToken);
          this.updatePendingQI();
          this.updateAPR();
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
      () => this.stakeAmount.input,
      (input) => {
        console.log('watch stake amount');
        const amount = BigNumber(input || 0);
        this.stakeAmount.amount = amount;
      }
    );
  }

  async approve(tokenAmount) {
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
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('approve failed', e);
    }
  }

  async updateShouldApprove(token) {
    let shouldApprove = false;
    let approving = false;
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
    this.updateToken(token, {
      shouldApprove,
      approving,
    });

    console.log('xxx ====>', this.qiToken);
  }

  updateToken(token, values) {
    this.vm.proxy.$store.commit('swap/updateToken', { token, values });
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
    const userInfo = await useQrypto().getQizeebreadUserInfo(QI_STAKING_POOL_ID);
    const balance = userInfo[0];

    this.updateToken(token, {
      balanceSatoshi: balance,
    });
  }

  async updatePendingQI() {
    try {
      const pendingQI = await useQrypto().getQizeebreadPendingQi(QI_STAKING_POOL_ID);
      this.pendingQI = new BigNumber(pendingQI).div(10**18).toFixed(3);
    } catch (e) {
      console.log('error', e);
    }
  }

  async updateAPR() {
    const totalStakedQI = await useQrypto().getQRC20Balance(this.qiToken, useQrypto().qizeebread);
    if (totalStakedQI.eq(0)) {
      return 0;
    }
    const apr = QIZEEBREAD_QI_PER_BLOCK[useNetwork(this.account.network)]
      .times(24 * 3600 * 365)
      .div(new BigNumber(totalStakedQI.toString()))
      .div(QTUM_SECONDS_ONE_BLOCK);
    this.apr = apr.toFixed(2);
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
      let params = [QI_STAKING_POOL_ID, qiAmount.amountSatoshi.toString(), to]; // pid, amount, to

      const tx = await qrypto.qizeebreadStake(method, params);
      const emptyObject = {};
      if (tx instanceof Transaction) {
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

  async unstake() {
    const qrypto = useQrypto();
    try {
      const stakeAmount = this.stakeAmount;
      const method = 'withdraw';
      let params = [QI_STAKING_POOL_ID, stakeAmount.amountSatoshi.toString()];
      
      const tx = await qrypto.qizeebreadStake(method, params);
      const emptyObject = {};
      if (tx instanceof Transaction) {
        qrypto.emit('tx', {
          type: TYPE_QIZEEBREAD_UNSTAKE,
          raw: tx,
          emptyObject,
          emptyObject
        });
      }
    } catch (e) {
      console.log('Unstake error', e);
    }
  }

  async harvest() {
    const qrypto = useQrypto();
    try {

      const to = qrypto.wrapHex(qrypto.hexAddress);
      const method = 'withdraw';
      let params = [QI_STAKING_POOL_ID, 0]; // pid, amount

      const tx = await qrypto.qizeebreadStake(method, params);
      const emptyObject = {};
      if (tx instanceof Transaction) {
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
