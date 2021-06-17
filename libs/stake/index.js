/* eslint-disable */
import {
  reactive,
  computed,
  useContext,
  watch,
  onMounted,
  getCurrentInstance,
} from '@nuxtjs/composition-api';
import BigNumber from 'bignumber.js'; // eslint-disable-line
import { useQrypto } from '../qrypto'; // eslint-disable-line

import { Token, TokenAmount } from '../swap';

import { ABI, QI, QIBAR } from '../constants';

export class Stake {
  constructor() {
    const vm = getCurrentInstance();
    const {
      store: { state },
    } = useContext();
    this.vm = vm;

    this.totalShares = 0;
    this.totalQi = 0;
    // data from store
    this.account = computed(() => state.swap.account);
    this.xQiPrice = computed(() => {
      if (this.totalShares === 0 || this.totalQi === 0) {
        return 1;
      }
      return this.totalShares / this.totalQi;
    });

    // this.vm.proxy.$axios.$get('/tokens.json').then((tokens) => {
    //   // tokens.filter((token) =>)
    //   // this.qiToken = new Token();
    // });
    // this.qiToken = new Token({
    //   name: "tQi",
    //   symbol: "TQI",
    //   icon: "/icons/tqi.svg",
    //   decimals: 8,
    //   chainId: 1,
    //   address: "0b3efd69c64a6d66dc0f1dd41adae48d23090c2f"
    // });
    // this.xQiToken = new Token({
    //   name: "TQiBar",
    //   symbol: "xTQi",
    //   icon: "/icons/tqi.svg",
    //   decimals: 18,
    //   chainId: 1,
    //   address: "f10091ab90ed9a75d5a8415993ba12dd1a031bc2"
    // });

    this.qiToken = new Token(QI['MainNet']);
    this.xQiToken = new Token(QIBAR['TestNet']);

    this.qiTokenAmount = new TokenAmount(this.qiToken);
    this.xQiTokenAmount = new TokenAmount(this.xQiTokenAmount);
  }

  watchAll() {
    this.watchAccount();

    onMounted(() => {
      // component mounted
      console.log('[onMounted]');
    });
  }

  watchAccount() {
    // update balance if account has been changed
    watch(
      () => this.account,
      async (account) => {
        if (account?.loggedIn) {
          const network =  useQrypto().account? useQrypto().account?.network : 'MainNet';
          this.qiToken = new Token(QI[network]);
          const balance0 = await this.qiToken.getBalance(false);
          this.qiToken.balanceSatoshi = balance0;
          this.qiTokenAmount = new TokenAmount(this.qiToken, balance0);
          this.xQiToken = new Token(QIBAR[network]);
          const balance1 = await this.xQiToken.getBalance(false);
          this.xQiToken.balanceSatoshi = balance1;
          this.xQiTokenAmount = new TokenAmount(this.xQiToken, balance1);
        } else {
          // TODO - account is logout now, so please set QI and xQI value as 0
          this.qiTokenAmount.amountSatoshi = BigNumber(0);
          this.xQiTokenAmount.amountSatoshi = BigNumber(0);
        }
      },
      { immediate: true }
    );
  }

  enterStake() {
    console.log('[]', this.qiTokenAmount.input);
  }
  
  leaveStake() {
    
  }
}

export const useStake = () => {
  console.log('[useStake]');
  const stake = reactive(new Stake());
  stake.watchAll();
  return stake;
};
