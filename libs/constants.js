import BigNumber from 'bignumber.js';

export const QI_ADDRESS = '54fefdb5b31164f66ddb68becd7bdd864cacd65b';
export const TYPE_SWAP = 'swap';
export const TYPE_ADD_LIQUIDITY = 'addLiquidity';
export const TYPE_REMOVE_LIQUIDITY = 'removeLiquidity';
export const TYPE_APPROVE = 'approve';
export const SWAP_EXACT_INPUT = 'input';
export const SWAP_EXACT_OUTPUT = 'output';

export { default as ABI } from './abi';
export const MAX_UINT_256 = BigNumber(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
);
export const MINIMUM_LIQUIDITY = 0.00001;
export const BASE_FEE = 0.003;
export const ZERO_ADDRESS = '0000000000000000000000000000000000000000';
export const CHAIN_ID = {
  0: 'MainNet',
  1: 'TestNet',
  2: 'RegTest',
};
export const NETWORK = {
  MainNet: 0,
  TestNet: 1,
  RegTest: 2,
};
export const DOMAIN = {
  // 0: 'infoapi.backendq.com',
  0: 'qtum.info',
  1: 'testnet.qtum.info',
};
export const INSIGHT_DOMAIN = {
  0: 'insight.backendq.com',
  1: 'testnet-api.qiswap.com',
};
Object.keys(DOMAIN).forEach((chainId) => {
  DOMAIN[CHAIN_ID[chainId]] = DOMAIN[chainId];
});
Object.keys(INSIGHT_DOMAIN).forEach((chainId) => {
  INSIGHT_DOMAIN[CHAIN_ID[chainId]] = INSIGHT_DOMAIN[chainId];
});
export const WQTUM = [
  {
    chainId: NETWORK.MainNet,
    address: 'e7e5caae57b34b93c57af9478a5130f62e3d2827',
  },
  {
    chainId: NETWORK.TestNet,
    address: 'f17277ffd027e75ec3f9e6db0e6fd1fd395e2cc0',
  },
];
export const ROUTER = {
  [NETWORK.MainNet]: 'd4915308a9c4c40f57b0eccc63ee70616982842b',
  [NETWORK.TestNet]: '115931c3529e469d9240b90eb2f4965a61b1375e',
};
export const FACTORY = {
  [NETWORK.MainNet]: '284937a9f5a1d28268d4e48d5eda03b04a7a1786',
  [NETWORK.TestNet]: '086edcf3fc8a042c1b174e941187369d2919e06b',
};

// QiZeeBread constants
export const Qizeebread = {
  [NETWORK.MainNet]: '25495b3a87d82e9d7a71b341addfc0d7bb3475c7',
  [NETWORK.TestNet]: 'f3d23a83497e12bea8dd9e6e69889ef6188d96a3',
};

export const QI = [
  {
    chainId: NETWORK.MainNet,
    address: '54fefdb5b31164f66ddb68becd7bdd864cacd65b',
  },
  {
    chainId: NETWORK.TestNet,
    address: 'eef715b7bb22a7be5ef67052d91bf724aa210b24',
  },
];

export const QIZEEBREAD_QI_PER_BLOCK = {
  [NETWORK.MainNet]: new BigNumber(10).times(10 ** 16),
  [NETWORK.TestNet]: new BigNumber(10).times(10 ** 18),
};

export const TYPE_QIZEEBREAD_STAKE = 'qizeebread_stake';
export const TYPE_QIZEEBREAD_UNSTAKE = 'qizeebread_unstake';
export const TYPE_QIZEEBREAD_HARVEST = 'qizeebread_harvest';
// QTUM generates one block in around 30 seconds
export const QTUM_SECONDS_ONE_BLOCK = 30;
