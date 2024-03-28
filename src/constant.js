export const Address = {
    BTCAddress: '0x249A61C6b439c0e5feE8164292D86Da6b5f6D809',
    opBridgeContract: '0x5ac7f4653D582c56FE97D145c0C1c5B87FcA27f9',
    baseBridgeContract: '0x99CCfb7f7A41c917CA4243126B9AF34Ef9b1EacF',
}

export const ABI = {
    BRIDGE_ABI: [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_middleware",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "ackPackets",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "channelId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "srcPortAddr",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint256",
                  "name": "mwBitmap",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes32",
                  "name": "destPortAddr",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes",
                  "name": "appData",
                  "type": "bytes"
                }
              ],
              "internalType": "struct UniversalPacket",
              "name": "packet",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "bool",
                  "name": "success",
                  "type": "bool"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct AckPacket",
              "name": "ack",
              "type": "tuple"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "middleware",
              "type": "address"
            }
          ],
          "name": "authorizeMiddleware",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "authorizedMws",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "destPortAddr",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "channelId",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "crossChainBridge",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "mw",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "channelId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "srcPortAddr",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint256",
                  "name": "mwBitmap",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes32",
                  "name": "destPortAddr",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes",
                  "name": "appData",
                  "type": "bytes"
                }
              ],
              "internalType": "struct UniversalPacket",
              "name": "packet",
              "type": "tuple"
            }
          ],
          "name": "onRecvUniversalPacket",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "bool",
                  "name": "success",
                  "type": "bool"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct AckPacket",
              "name": "ackPacket",
              "type": "tuple"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "channelId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "srcPortAddr",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint256",
                  "name": "mwBitmap",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes32",
                  "name": "destPortAddr",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes",
                  "name": "appData",
                  "type": "bytes"
                }
              ],
              "internalType": "struct UniversalPacket",
              "name": "packet",
              "type": "tuple"
            }
          ],
          "name": "onTimeoutUniversalPacket",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "channelId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "srcPortAddr",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint256",
                  "name": "mwBitmap",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes32",
                  "name": "destPortAddr",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes",
                  "name": "appData",
                  "type": "bytes"
                }
              ],
              "internalType": "struct UniversalPacket",
              "name": "packet",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "bool",
                  "name": "success",
                  "type": "bool"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct AckPacket",
              "name": "ack",
              "type": "tuple"
            }
          ],
          "name": "onUniversalAcknowledgement",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "recvedPackets",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "channelId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "srcPortAddr",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint256",
                  "name": "mwBitmap",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes32",
                  "name": "destPortAddr",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes",
                  "name": "appData",
                  "type": "bytes"
                }
              ],
              "internalType": "struct UniversalPacket",
              "name": "packet",
              "type": "tuple"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_middleware",
              "type": "address"
            }
          ],
          "name": "setDefaultMw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "timeoutPackets",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "channelId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "srcPortAddr",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint256",
                  "name": "mwBitmap",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes32",
                  "name": "destPortAddr",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes",
                  "name": "appData",
                  "type": "bytes"
                }
              ],
              "internalType": "struct UniversalPacket",
              "name": "packet",
              "type": "tuple"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "stateMutability": "payable",
          "type": "receive"
        }
      ],
    ERC20_ABI: [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "allowance",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "needed",
              "type": "uint256"
            }
          ],
          "name": "ERC20InsufficientAllowance",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "balance",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "needed",
              "type": "uint256"
            }
          ],
          "name": "ERC20InsufficientBalance",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "approver",
              "type": "address"
            }
          ],
          "name": "ERC20InvalidApprover",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "receiver",
              "type": "address"
            }
          ],
          "name": "ERC20InvalidReceiver",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "ERC20InvalidSender",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            }
          ],
          "name": "ERC20InvalidSpender",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            }
          ],
          "name": "OwnableInvalidOwner",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "OwnableUnauthorizedAccount",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "admin",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            }
          ],
          "name": "allowance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "burn",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "changedAdmin",
              "type": "address"
            }
          ],
          "name": "changeAdmin",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "decimals",
          "outputs": [
            {
              "internalType": "uint8",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getAdmin",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "mint",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "symbol",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "totalSupply",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "transfer",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
}