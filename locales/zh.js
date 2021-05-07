export default {
  common: {
    detail: '阅读详情',
    loading: '加载中...',
    description: '是一个去中心化的协议，基于自动做市（AMM）算法在 Qtum 上自动提供流动性。',
    announcement: 'QiSwap现在是测试版本，部署在QTUM测试网。需要您自担风险使用它。',
    downloadExt: '点击 {here} 下载 QiWallet。',
    here: '这里'
  },
  nav: {
    index: '首页',
    transaction: '打开 Swap',
    stake: 'Stake',
    product: '所有产品',
    doc: '文档',
    contact: '联系我们',
    faq: 'FAQ?',
    menu: '菜单',
    install: '安装 QiWallet',
    connect: '连接钱包',
    connecting: '正在连接...',
    browser: '打开浏览器',
    pending: '确认中 | {count} 确认中',
    accountModal: {
      title: '账户信息',
      copy: '复制地址',
      copied: '复制成功',
      view: '前往 qtum.info 查看',
      record: '交易记录',
      type: '类型',
      status: '状态',
      empty: '暂无数据'
    }
  },
  footer: {
    intro: '一个去中心化的协议，基于自动做市（AMM）算法在 Qtum 上自动提供流动性。',
    contact: '联系我们'
  },
  index: {
    banner: {
      title: 'QiSwap',
      intro: '一个去中心化的协议，基于自动做市（AMM）算法在 Qtum 上自动提供流动性。',
      open: '打开 Swap',
      doc: '阅读文档',
      qiswap: '注意：需要先安装 QiWallet 才能使用 QiSwap。进行交易前，请先确保你已安装 QiWallet。'
    },
    plates: {
      features: {
        content: [
          {
            title: '透明',
            icon: 'transparent',
            content: '在 Qtum 上，QiSwap 是透明的，不受审查的金融基础结构。'
          },
          {
            title: '稳定',
            icon: 'lower',
            content: 'QiSwap 具有更低的手续费，更快的交易确认，以及更稳定价格。'
          },
          {
            title: '开放',
            icon: 'open',
            content: 'QiSwap 使任何人都能够创造新的市场，提供流动性，并构建以前不可能存在的金融应用程序。'
          }
        ]
      },
      use: {
        title: 'QiSwap 文档',
        content: [
          {
            title: 'Swap 使用教程',
            icon: 'phone',
            action: 'https://github.com/qiswapexchange/docs/wiki/How-to-Swap-tokens-on-QiSwap',
            content: '有关开始使用 QiSwap 进行交易分步教程。'
          },
          {
            title: 'QiWallet 使用教程',
            icon: 'task',
            action: 'https://github.com/qiswapexchange/docs/wiki/How-to-install-QiWallet-on-Google-Chrome',
            content: '如何使用 QiWallet 进行交易。'
          },
          {
            title: '挖矿教程',
            icon: 'book',
            action: 'https://github.com/qiswapexchange/docs/wiki/Adding-Liquidity-on-QiSwap',
            content: '如何 QiSwap 中参加流动性挖矿。'
          }
        ]
      },
      faq: {
        title: '常见问题',
        content: [
          {
            title: '什么是自动做市商(AMM)？',
            content: '自动做市商（AMM）是一种算法，具有交易自动化，无人化，可提供可履行合同的流动性。'
          },
          {
            title: '会不会丢失资产？',
            content: '不会！因为所有的交易都是直接在 Qtum 链上进行，无法被篡改，永不会丢失。'
          },
          {
            title: 'Gas 费为什么需要支付？',
            content: '当发送代币，需要执行智能合约时，需要消耗网络资源，所以必须支付 Gas 费才能让矿工为你打包交易。但是 QTUM 是很便宜的。'
          }
        ]
      }
    }
  },
  swap: {
    setting: '设置',
    exchange: '兑换',
    pool: '资金池',
    balance: '余额:',
    input: '请输入 QTUM',
    modal: {
      settings: '交易设置',
      tolerance: '价格滑点',
      deadline: '截止时间',
      minutes: '分钟',
      confirm: '确认设置',
      remove: '移除',
      token: {
        name: '代币名称',
        select: '请选择一个 token',
        search: '搜索名称或粘贴地址'
      }
    },
    swapInfo: {
      impact: {
        label: '价格影响',
        tip: '市场价格与估计价格因交易规模而产生的差额。'
      },
      minimum: {
        label: '最少买入',
        tip: '如果在确认前有一个很大的价格变动，你的交易将会失败。'
      },
      maximum: {
        label: '最多卖出',
        tip: '如果在确认前有一个很大的价格变动，你的交易将会失败。'
      },
      fee: {
        label: '流动性提供者费用',
        tip: '每笔交易的一部分（0.30%）将作为协议激励提供给流动性提供者。'
      }
    },
    poolInfo: {
      first: '您是第一个流动性提供商。',
      ratio: '您添加的代币比例将设置此池的价格。',
      click: '一旦你对比例满意，点击增加流动性。',
      share: '资金池份额',
      my: '我的资金池'
    },
    liquidityInfo: {
      remove: '移除流动性资产',
      amount: '数额'
    },
    status: {
      select: '选择代币',
      insufficient: '此交易对流动性不足',
      input: '输入金额',
      balance: '{tokenName} 余额不足',
      swap: '兑换',
      swaping: '兑换中...',
      approve: '授权 {tokenName}',
      approving: '授权 {tokenName} 中...',
      remove: '移除',
      removing: '移除中...',
      add: '添加流动性',
      adding: '添加流动性中...'
    },
    select: '请选择',
    waitingValidating: '正在校验本次交易',
    confirmTransaction: '请在 QiWallet 上确认正在进行的交易'
  },
  transaction: {
    swap: '将 {token0} 兑换为 {token1}',
    add: '添加 {token0} 和 {token1}',
    remove: '移除 {token0} 和 {token1}',
    approve: '授权 {token}'
  }
}
