export default {
  common: {
    detail: 'Learn more',
    loading: 'Loading...',
    description:
      'QiSwap is a fully decentralized protocol that automatically provides liquidity for QTUM based on automated market making (AMM) algorithms.',
    announcement:
      'QiSwap is running on QTUM Mainnet, remember, this is still experimental software, use it at your own risk.',
    downloadExt: 'Download QiWallet {here}.',
    here: 'here',
  },
  nav: {
    index: 'Home',
    transaction: 'Launch Swap',
    stake: 'Stake',
    product: 'Products',
    doc: 'Docs',
    contact: 'Contact',
    faq: 'FAQ?',
    menu: 'Menu',
    install: 'Install QiWallet',
    connect: 'Connect to QiWallet',
    connecting: 'Connecting...',
    browser: 'Open Explorer',
    pending: '{count} Pending | {count} Pendings',
    accountModal: {
      title: 'Account',
      copy: 'Copy Address',
      copied: 'Copy Successful',
      view: 'View on qtum.info',
      record: 'Transaction Records',
      type: 'Type',
      status: 'Status',
      empty: 'Empty',
    },
  },
  footer: {
    intro:
      'A fully decentralized protocol that automatically provides liquidity for QTUM based on automated market making (AMM) algorithms.',
    contact: 'Contact Us',
  },
  index: {
    banner: {
      title: 'QiSwap',
      intro:
        'A fully decentralized protocol that automatically provides liquidity for QTUM based on automated market making (AMM) algorithms.',
      open: 'Launch Swap',
      doc: 'Read docs',
      qiswap:
        "NOTE: You need to install QiWallet in order to be able to use QiSwap. If you haven't installed QiWallet, please do so before proceeding to the exchange.",
    },
    plates: {
      features: {
        content: [
          {
            title: 'Transparent',
            icon: 'transparent',
            content:
              'QiSwap is transparent, censorship-resistant financial infrastructure for QTUM.',
          },
          {
            title: 'Stable',
            icon: 'lower',
            content:
              'QiSwap has lower handling fees, faster transaction confirmation, and more stable prices.',
          },
          {
            title: 'Free',
            icon: 'open',
            content:
              'QiSwap enables anyone to create new markets, provide liquidity, and build financial applications that could not have existed before.',
          },
        ],
      },
      use: {
        title: 'QiSwap Docs',
        content: [
          {
            title: 'How to trade on Qiswap',
            icon: 'phone',
            action: 'https://learn.qiswap.com/swap-tokens-on-qiswap',
            content: 'A step-by-step guide to start trading with QiSwap.',
          },
          {
            title: 'How to use QiWallet',
            icon: 'task',
            action:
              'https://learn.qiswap.com/install-qiwallet-on-google-chrome',
            content: 'How to trade with qiwallet.',
          },
          {
            title: 'How to add liquidity',
            icon: 'book',
            action: 'https://learn.qiswap.com/add-liquidity',
            content: 'How to participate in liquidity mining on QiSwap.',
          },
        ],
      },
      faq: {
        title: 'Frequently Asked Questions',
        content: [
          {
            title: 'What is the QIAD contract address?',
            content: 'You can find it in learn.qiswap.com',
          },
          {
            title: 'What is the QI contract address?',
            content: 'You can find it in learn.qiswap.com',
          },
          {
            title: 'Why do I need to pay for Gas?',
            content:
              'When tokens are sent and smart contracts need to be executed, network resources need to be consumed, so gas fees must be paid to allow miners to package transactions for you. But QTUM is very cheap.',
          },
        ],
      },
    },
  },
  swap: {
    setting: 'Settings',
    exchange: 'Swap',
    pool: 'Pool',
    balance: 'Balance:',
    input: 'Please input QTUM',
    modal: {
      settings: 'Transaction Setting',
      tolerance: 'Slippage Tolerance',
      deadline: 'Transaction Deadline',
      minutes: 'minutes',
      confirm: 'Confirm',
      remove: 'Remove',
      token: {
        name: 'Token Name',
        select: 'Select a token',
        search: 'Search name or copy address',
      },
    },
    swapInfo: {
      impact: {
        label: 'Price Impact',
        tip: 'The difference between the market price and estimated price due to trade size.',
      },
      minimum: {
        label: 'Minimum Received',
        tip: 'Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.',
      },
      maximum: {
        label: 'Maximum sold',
        tip: 'Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.',
      },
      fee: {
        label: 'Liquidity Provider Fee',
        tip: 'A portion of each trade (0.30%) goes to liquidity providers as a protocol incentive.',
      },
    },
    poolInfo: {
      first: 'You are the first liquidity provider.',
      ratio: 'The ratio of tokens you add will set the price of this pool.',
      click: 'Once you are happy with the rate click add liquidity.',
      share: 'Share of pool',
      my: 'My Liquidity',
    },
    liquidityInfo: {
      remove: 'Remove Liquidity',
      amount: 'Amount',
    },
    status: {
      select: 'Select a Token',
      insufficient: 'Insufficient liquidity for this trade.',
      input: 'Input Amount',
      balance: 'Insufficient {tokenName} Balance',
      swap: 'Swap',
      swaping: 'Swaping...',
      approve: 'Approve {tokenName}',
      approving: 'Approving {tokenName} ...',
      remove: 'Remove',
      removing: 'Removing...',
      add: 'Add Liquidity',
      adding: 'Adding Liquidity...',
    },
    select: 'Select',
    waitingValidating: 'Transaction is being validated.',
    confirmTransaction: 'Please confirm the transaction on QiWallet.',
  },
  transaction: {
    swap: 'Swap {token0} for {token1}',
    add: 'Add {token0} and {token1}',
    remove: 'Remove {token0} and {token1}',
    approve: 'Approve {token}',
  },
};
