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

import { ABI } from '../constants';

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
          // TODO - account was changed, please update QI and xQI amount
          console.log('[account is logged in]'); // eslint-disable-line
          const totalShares = await useQrypto().callContract(
            'f10091ab90ed9a75d5a8415993ba12dd1a031bc2',
            ABI.QIBAR,
            'totalSupply'
          );

          // this.totalShares = totalShares

          console.log('[totalShare]', totalShares);

          const totalQi = await useQrypto().callContract(
            'd705f22089e634a5ca7d7c7a64e8e5abe1698faf',
            ABI.QRC20,
            'balanceOf',
            ['f10091ab90ed9a75d5a8415993ba12dd1a031bc2']
          );
          console.log('[totalQi]', totalQi);
        } else {
          // TODO - account is logout now, so please set QI and xQI value as 0
          console.log('[account was logged out]'); // eslint-disable-line
        }
      }
    );
  }
}

export const useStake = () => {
  const stake = reactive(new Stake());
  stake.watchAll();
  return stake;
};
