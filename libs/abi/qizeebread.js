export default [
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_qi",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_qiPerBlock",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "pid",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      }
    ],
    name: "Deposit",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "pid",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      }
    ],
    name: "EmergencyWithdraw",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "pid",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pending",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "harvested",
        type: "uint256"
      }
    ],
    name: "Harvest",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [],
    name: "LogInit",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "pid",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "allocPoint",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "contract IERC20",
        name: "lpToken",
        type: "address"
      }
    ],
    name: "LogPoolAddition",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "pid",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "allocPoint",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "contract IRewarder",
        name: "rewarder",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "overwrite",
        type: "bool"
      }
    ],
    name: "LogSetPool",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "pid",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "lastRewardBlock",
        type: "uint64"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "lpSupply",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "accQiPerShare",
        type: "uint256"
      }
    ],
    name: "LogUpdatePool",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "pid",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "Withdraw",
    type: "event"
  },
  {
    inputs: [],
    name: "QI",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "migrator",
    outputs: [
      {
        internalType: "contract IMigratorChef",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "poolInfo",
    outputs: [
      {
        internalType: "uint128",
        name: "accQiPerShare",
        type: "uint128"
      },
      {
        internalType: "uint64",
        name: "lastRewardBlock",
        type: "uint64"
      },
      {
        internalType: "uint64",
        name: "allocPoint",
        type: "uint64"
      },
      {
        internalType: "contract IERC20",
        name: "lpToken",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "qiPerBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "rewarder",
    outputs: [
      {
        internalType: "contract IRewarder",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalAllocPoint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "userInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "rewardDebt",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "poolLength",
    outputs: [
      {
        internalType: "uint256",
        name: "pools",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IRewarder",
        name: "_rewarder",
        type: "address"
      }
    ],
    name: "setRewarder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "allocPoint",
        type: "uint256"
      },
      {
        internalType: "contract IERC20",
        name: "_lpToken",
        type: "address"
      }
    ],
    name: "add",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_allocPoint",
        type: "uint256"
      },
      {
        internalType: "contract IRewarder",
        name: "_rewarder",
        type: "address"
      },
      {
        internalType: "bool",
        name: "overwrite",
        type: "bool"
      }
    ],
    name: "set",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IMigratorChef",
        name: "_migrator",
        type: "address"
      }
    ],
    name: "setMigrator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256"
      }
    ],
    name: "migrate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "_user",
        type: "address"
      }
    ],
    name: "pendingQi",
    outputs: [
      {
        internalType: "uint256",
        name: "pending",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "pids",
        type: "uint256[]"
      }
    ],
    name: "massUpdatePools",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pid",
        type: "uint256"
      }
    ],
    name: "updatePool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pid",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      }
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pid",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pid",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      }
    ],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
]
