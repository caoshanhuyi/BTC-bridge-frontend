import './App.css';
import Web3 from 'web3';
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { ABI, Address } from "./constant";

function getBigUnitNum(number) {
  const num = new BigNumber(number);
  const result = num.multipliedBy(new BigNumber(10).pow(18));
  return result.toNumber();
}

async function queryOpBalance(currentAccount, setOpBalance, setOpTokenSymbol) {
  console.log(currentAccount)
  let currentAccountOpBalance, srcTokenSymbol;
  try {
    const contract = new (new Web3('https://public.stackup.sh/api/v1/node/optimism-sepolia')).eth.Contract(ABI.ERC20_ABI, Address.BTCAddress);
    const balance = await contract.methods.balanceOf(
      currentAccount,
    ).call();
    const symbol = await contract.methods.symbol().call();
    let bigNumber = new BigNumber(Number(balance));
    let result = bigNumber.dividedBy('1e18');
    currentAccountOpBalance = result.toString()
    srcTokenSymbol = symbol

    console.log(result.toString());
  } catch (error) {
    console.error('query op balance', error);
  }
  setOpBalance(currentAccountOpBalance);
  setOpTokenSymbol(srcTokenSymbol);
}

async function queryBaseBalance(currentAccount, setBaseBalance, setBaseTokenSymbol) {
  console.log(currentAccount)
  let currentAccountBaseBalance, dstTokenSymbol;
  try {
    const contract = new (new Web3('https://sepolia.base.org')).eth.Contract(ABI.ERC20_ABI, Address.BTCAddress);
    const balance = await contract.methods.balanceOf(
      currentAccount,
    ).call();
    const symbol = await contract.methods.symbol().call();
    let bigNumber = new BigNumber(Number(balance));
    let result = bigNumber.dividedBy('1e18');
    currentAccountBaseBalance = result.toString()
    dstTokenSymbol = symbol

    console.log(result.toString());
  } catch (error) {
    console.error('query base balance', error);
  }
  setBaseBalance(currentAccountBaseBalance);
  setBaseTokenSymbol(dstTokenSymbol);
}
function App() {

  const [metamaskIsInstalled, setMetamaskIsInstalled] = useState(false);
  const [notice, setNotice] = useState('');
  const [isOptimismNetwork, setIsOptimismNetwork] = useState(false);
  const [metamaskConnected, setMetamaskConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');
  const [opTransferAmount, setOpTansferAmount] = useState('');
  const [baseTransferAmount, setBaseTransferAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [opBalance, setOpBalance] = useState(0);
  const [opTokenSymbol, setOpTokenSymbol] = useState('');
  const [baseBalance, setBaseBalance] = useState(0);
  const [baseTokenSymbol, setBaseTokenSymbol] = useState('');

  useEffect(() => {
    const opWeb3 = new Web3('https://public.stackup.sh/api/v1/node/optimism-sepolia');
    const baseWeb3 = new Web3('https://sepolia.base.org');
    const fetchData = async () => {
      if (typeof window.ethereum !== 'undefined') {
        setMetamaskIsInstalled(true);
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (chainId !== '0xaa37dc' || chainId !== '0x14a34') {
          setNotice('Does not support the current network, please switch to the Optimism network.')
        } else {
          setIsOptimismNetwork(true);
        }
        if (window.ethereum.isConnected()) {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' })
          if (accounts && accounts.length > 0) {
            setCurrentAccount(accounts[0]);
            setMetamaskConnected(true);
            queryOpBalance(accounts[0], setOpBalance, setOpTokenSymbol);
            queryBaseBalance(accounts[0], setBaseBalance, setBaseTokenSymbol);
          }

        }
      }
    };
    fetchData();
  }, [])
  return (
    <div className="app">
      <div className='head-container'>
        {metamaskConnected ? (<span>{currentAccount}</span>) : (<button className='btn wallet-connect-button' onClick={
          async () => {
            try {
              await window.ethereum.enable();
              const accounts = await new Web3(window.ethereum).eth.getAccounts();
              setCurrentAccount(accounts[0])
              setMetamaskConnected(true);
              queryOpBalance(accounts[0], setOpBalance, setOpTokenSymbol);
              queryBaseBalance(accounts[0], setBaseBalance, setBaseTokenSymbol);
            } catch (error) {
              console.error('connect wallet failed', error);
            }
          }

        }>
          Connect Wallet
        </button>)}

      </div>
      <div className='body-container'>

        <div className='body-wrapper'>
          {isLoading && <div className='loading-spinner'>Loading...</div>}
          <div className='body-top'>
            <input
              className='input'
              type='text'
              onChange={(event) => {
                console.log(event.target.value);
                setOpTansferAmount(event.target.value);
              }}
            />
            <span>op balance: </span>
            <span>{opBalance} {opTokenSymbol}</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="yellowgreen"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-arrow-down"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>

          <div className='body-bottom'>
            <span>base balance: </span>
            <span>{baseBalance} {baseTokenSymbol}</span>
          </div>
          <button className='btn' onClick={
            async () => {
              try {
                console.log('transfer token', opTransferAmount);
                try {
                  setIsLoading(true);
                  const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                  if (chainId !== '0xaa37dc') {
                    await window.ethereum.request({
                      method: 'wallet_switchEthereumChain',
                      params: [{ chainId: '0xaa37dc' }],
                    });
                  }
                  const web3 = new Web3(window.ethereum);
                  await window.ethereum.enable();
                  const accounts = await web3.eth.getAccounts();
                  const myAccount = accounts[0];
                  const contract = new web3.eth.Contract(ABI.BRIDGE_ABI, Address.opBridgeContract);
                  const channel = web3.utils.padRight(web3.utils.asciiToHex("channel-10"), 64);
                  const receipt = await contract.methods.crossChainBridge(
                    Address.baseBridgeContract,
                    channel,
                    getBigUnitNum(opTransferAmount)
                  ).send({ from: myAccount });

                  setTimeout(() => {
                    setIsLoading(false);
                    queryBaseBalance(myAccount, setBaseBalance, setBaseTokenSymbol)
                    queryOpBalance(myAccount, setOpBalance, setOpTokenSymbol)
                  }, 20000)

                  console.log('send cross chain tx successful', receipt);
                } catch (error) {
                  setIsLoading(false);
                  console.error('send cross chain tx failed', error);
                }
              } catch (error) {
                console.error('send cross chain tx failed', error);
              }
            }

          }>
            Transfer
          </button>
        </div>

        <div className='body-wrapper'>
          {isLoading && <div className='loading-spinner'>Loading...</div>}
          <div className='body-top'>
            <input
              className='input'
              type='text'
              onChange={(event) => {
                console.log(event.target.value);
                setBaseTransferAmount(event.target.value);
              }}
            />
            <span>base balance: </span>
            <span>{baseBalance} {baseTokenSymbol}</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="yellowgreen"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-arrow-down"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>

          <div className='body-bottom'>
            
            <span>op balance: </span>
            <span>{opBalance} {opTokenSymbol}</span>
          </div>
          <button className='btn' onClick={
            async () => {
              try {
                console.log('transfer token', baseTransferAmount);
                try {
                  setIsLoading(true);
                  const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                  if (chainId !== '0x14a34') {
                    await window.ethereum.request({
                      method: 'wallet_switchEthereumChain',
                      params: [{ chainId: '0x14a34' }],
                    });
                  }
                  const web3 = new Web3(window.ethereum);
                  await window.ethereum.enable();
                  const accounts = await web3.eth.getAccounts();
                  const myAccount = accounts[0];
                  const contract = new web3.eth.Contract(ABI.BRIDGE_ABI, Address.baseBridgeContract);
                  const channel = web3.utils.padRight(web3.utils.asciiToHex("channel-11"), 64);
                  const receipt = await contract.methods.crossChainBridge(
                    Address.opBridgeContract,
                    channel,
                    getBigUnitNum(baseTransferAmount)
                  ).send({ from: myAccount });

                  setTimeout(() => {
                    setIsLoading(false);
                    queryBaseBalance(myAccount, setBaseBalance, setBaseTokenSymbol)
                    queryOpBalance(myAccount, setOpBalance, setOpTokenSymbol)
                  }, 20000)

                  console.log('send cross chain tx successful', receipt);
                } catch (error) {
                  setIsLoading(false);
                  console.error('send cross chain tx failed', error);
                }
              } catch (error) {
                console.error('send cross chain tx failed', error);
              }
            }

          }>
            Transfer
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
