import { reactive } from '@nuxtjs/composition-api';
import { useQrypto } from '../qrypto';
class Stake {
  async qiPrice() {

  }
}

export const useStake = () => {
  const stake = reactive(new Stake());

  return stake;
}