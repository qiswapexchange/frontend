export default {
  common: {
    detail: 'Continue leyendo',
    loading: 'Cargando...',
    description:
      'QiSwap es un protocolo completamente decentralizado el cual automaticamente provee liquides para QTUM basado en algoritmos de manejo de mercados automatizados (AMM).',
    announcement:
      'QiSwap funciona en QTUM red principal, recuerde, esto aun es software experimental, utilizalo bajo tu propio riesgo.',
    downloadExt: 'Descarga QiWallet {here}.',
    here: 'here',
  },
  nav: {
    index: 'Inicio',
    transaction: 'Iniciar la plataforma',
    stake: 'Stake',
    product: 'Productos',
    doc: 'Docs',
    contact: 'Contacto',
    faq: 'FAQ?',
    menu: 'Menu',
    install: 'Instalar QiWallet',
    connect: 'Connectar a QiWallet',
    connecting: 'Connectando...',
    browser: 'Abrir Explorer',
    pending: '{count} Pendiente | {count} Pendientes',
    accountModal: {
      title: 'Cuenta',
      copy: 'Copiar Direccion',
      copied: 'Copia exitosa',
      view: 'Ver en qtum.info',
      record: 'Registros de Transaccion',
      type: 'Tipo',
      status: 'Estado',
      empty: 'Vacio',
    },
  },
  footer: {
    intro:
      'QiSwap es un protocolo completamente decentralizado el cual automaticamente provee liquides para QTUM basado en algoritmos de manejo de mercados automatizados (AMM).',
    contact: 'Contactenos',
  },
  index: {
    banner: {
      title: 'QiSwap',
      intro:
        'QiSwap es un protocolo completamente decentralizado el cual automaticamente provee liquides para QTUM basado en algoritmos de manejo de mercados automatizados (AMM).',
      open: 'Iniciar Swap',
      doc: 'Leer documentacion',
      qiswap:
        'NOTA: Es necesario tener instalado QiWallet para que QiSwap pueda funcionar correctamente. Si no has instalado QiWallet, por favor instalala antes de continuar.',
    },
    plates: {
      features: {
        content: [
          {
            title: 'Transparente',
            icon: 'transparent',
            content:
              'QiSwap es una infrastructura creada en QTUM transparente y resistente a la censura.',
          },
          {
            title: 'Estable',
            icon: 'lower',
            content:
              'QiSwap tiene tarifas de manejo mucho mas bajas, confirmacion de transacciones mas rapida y precios mas estables.',
          },
          {
            title: 'Libre',
            icon: 'open',
            content:
              'QiSwap le permite a cualquiera crear nuevos mercados, proveer liquidez, y crear aplicaciones financieras que no podrian haber existido antes.',
          },
        ],
      },
      use: {
        title: 'Documentacion de QiSwap',
        content: [
          {
            title: 'Como utilizar Qiswap',
            icon: 'phone',
            action: 'https://learn.qiswap.com/swap-tokens-on-qiswap',
            content: 'Una guia paso a paso de como utilizar QiSwap.',
          },
          {
            title: 'Como utilizar QiWallet',
            icon: 'task',
            action:
              'https://learn.qiswap.com/install-qiwallet-on-google-chrome',
            content: 'Como utilizar QiWallet.',
          },
          {
            title: 'Como agregar liquidez',
            icon: 'book',
            action: 'https://learn.qiswap.com/add-liquidity',
            content: 'Como participar en mineria de liquidez en QiSwap.',
          },
        ],
      },
      faq: {
        title: 'Preguntas frecuentes',
        content: [
          {
            title: 'Cual es la direccion de contrato de QIAD？',
            content:
              'La direccion de contrato de QIAD es: https://qtum.info/contract/f52150072f31b7ba1985a2145531967b1a5a7cea',
          },
          {
            title: 'Cual es la direccion de contrato de QI?',
            content:
              'La direccion de contrato de QI es: https://qtum.info/qrc20/54fefdb5b31164f66ddb68becd7bdd864cacd65b',
          },
          {
            title: 'Por que necesito pagar por Gas?',
            content:
              'Cuando los tokens son enviados y los contratos inteligentes son ejecutados, los recursos de la red necesitan ser consumidos, asi que las tarifas de gas deben ser pagadas para permitirle a los mineros empaquetar transacciones para ud. Pero QTUM es muy barato.',
          },
        ],
      },
    },
  },
  swap: {
    setting: 'Configuracion',
    exchange: 'Swap',
    pool: 'Pool',
    balance: 'Balance:',
    stake: 'Stake QI',
    unstake: 'Unstake',
    input: 'Por favor ingrese QTUM',
    modal: {
      settings: 'Configuracion de Transaccion',
      tolerance: 'Tolerance de deslizamiento',
      deadline: 'Tiempo limite de transaccion',
      minutes: 'minutes',
      confirm: 'Confirmar',
      remove: 'Remover',
      token: {
        name: 'Nombre de Token',
        select: 'Selecciona un token',
        search: 'Busca el nombre o copia direccion',
      },
    },
    swapInfo: {
      impact: {
        label: 'Impacto en el precio',
        tip: 'La diferencia entre el precio de mercado y el precio estimado dado el intercambio realizado.',
      },
      minimum: {
        label: 'Minimo recibido',
        tip: 'Tu transaccion se reversara si hay un movimiento grande y no favorable antes de que sea confirmada.',
      },
      maximum: {
        label: 'Maximo vendido',
        tip: 'Tu transaccion se reversara si hay un movimiento grande y no favorable antes de que sea confirmada.',
      },
      fee: {
        label: 'Tarifa para proveedor de liquidez',
        tip: 'Una porcion de cada transaccion (0.30%) se va a proveedores de liquidez como un incentivo del protocolo.',
      },
    },
    poolInfo: {
      first: 'Ud es el primer proveedor de liquidez.',
      ratio:
        'El porcentaje de tokens que ud agregue va a determinar el precio de este pool.',
      click:
        'Una vez que este contento con el porcentaje, dele click en agregar liquidez.',
      share: 'Porcentaje de Pool',
      my: 'Mi Liquidez',
    },
    liquidityInfo: {
      remove: 'Remover liquidez',
      amount: 'Cantidad',
    },
    status: {
      select: 'Selecciona un Token',
      insufficient: 'Cantidad insuficiente para esta transaccion.',
      input: 'Ingrese cantidad',
      balance: 'Balance insuficiente de {tokenName}',
      swap: 'Swap',
      swaping: 'Swaping...',
      approve: 'Aprobar {tokenName}',
      approving: 'Aprobando {tokenName} ...',
      remove: 'Remover',
      removing: 'Removiendo...',
      add: 'Agregar liquidez',
      adding: 'Agregando liquidez...',
    },
    select: 'Seleccionar',
    waitingValidating: 'La transaccion esta siendo validada.',
    confirmTransaction: 'Por favor confirme la transaccion en QiWallet.',
  },
  transaction: {
    swap: 'Swap {token0} por {token1}',
    add: 'Agrega {token0} y {token1}',
    remove: 'Remover {token0} y {token1}',
    approve: 'Aprobar {token}',
  },
};
