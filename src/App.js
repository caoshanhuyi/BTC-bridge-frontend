import { useEffect, useState, useRef, useMemo } from "react";
import './App.css';
import Web3 from 'web3';
import BigNumber from "bignumber.js";
import { ABI, Address } from "./constant";

function getBigUnitNum(number) {
  const num = new BigNumber(number);
  const result = num.multipliedBy(new BigNumber(10).pow(18));
  return result.toNumber();
}

async function queryOpBalance(currentAccount, setOpBalance, setOpTokenSymbol) {
  let balance, symbol;
  try {
    const contract = new (new Web3('https://public.stackup.sh/api/v1/node/optimism-sepolia')).eth.Contract(ABI.ERC20_ABI, Address.BTCAddress);
    const res = await contract.methods.balanceOf(
      currentAccount,
    ).call();
    const r = await contract.methods.symbol().call();
    let bigNumber = new BigNumber(Number(res));
    let result = bigNumber.dividedBy('1e18');
    balance = result.toString()
    symbol = r

    console.log(result.toString());
  } catch (error) {
    console.error('query op balance', error);
  }
  setOpBalance(balance);
  setOpTokenSymbol(symbol);
}
function Spin() {
  return (
    <div className='loading'>
      <div className="spin">
        <div className="spin-dot spin-dot-first"></div>
        <div className="spin-dot spin-dot-second"></div>
        <div className="spin-dot spin-dot-third"></div>
      </div>
    </div>

  );
}


async function queryBaseBalance(currentAccount, setBaseBalance, setBaseTokenSymbol) {
  let balance, symbol;
  try {
    const contract = new (new Web3('https://sepolia.base.org')).eth.Contract(ABI.ERC20_ABI, Address.BTCAddress);
    const res = await contract.methods.balanceOf(
      currentAccount,
    ).call();
    const r = await contract.methods.symbol().call();
    let bigNumber = new BigNumber(Number(res));
    let result = bigNumber.dividedBy('1e18');
    balance = result.toString()
    symbol = r

    console.log(result.toString());
  } catch (error) {
    console.error('query base balance', error);
  }
  setBaseBalance(balance);
  setBaseTokenSymbol(symbol);
}
function App() {
  const [metamaskConnected, setMetamaskConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [opBalance, setOpBalance] = useState(0);
  const [opTokenSymbol, setOpTokenSymbol] = useState('');
  const [baseBalance, setBaseBalance] = useState(0);
  const [baseTokenSymbol, setBaseTokenSymbol] = useState('');
  const [isFromOp, setIsFromOp] = useState(true);
  const inputRef = useRef();

  const topBalance = useMemo(() => {
    return isFromOp ? `${opBalance} ${opTokenSymbol}` : `${baseBalance} ${baseTokenSymbol}`;
  }, [opBalance, baseBalance, isFromOp, opTokenSymbol, baseTokenSymbol]);

  const bottomBalance = useMemo(() => {
    return isFromOp ? `${baseBalance} ${baseTokenSymbol}` : `${opBalance} ${opTokenSymbol}`;
  }, [baseBalance, baseBalance, isFromOp, opTokenSymbol, baseTokenSymbol]);


  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window.ethereum !== 'undefined') {
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
      <div className='header'>
        <img className='header-logo' src='https://assets-global.website-files.com/61dd1a9a1229241c240eea18/61dd1a9a12292419230eea32_Logo-Dark.svg' alt='logo' />
        <p className='header-title'>BTC Cross Chain Bridge</p>
        <div className='header-button-container'>
          {metamaskConnected ? (<span className='header-account'>{currentAccount}</span>) : (<button className='btn header-account-wallet-connect-button' onClick={
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
      </div>
      <div className='body'>
        <div className='body-content'>
          {isLoading && <Spin />}
          <div className='body-content-wrapper'>
            <div className='body-content-network'>
              <img className='body-content-network-logo' src={isFromOp ? 'https://optimism-sepolia.blockscout.com/assets/network_icon.svg' : 'https://base-sepolia.blockscout.com/assets/network_icon.svg'} alt='logo' />
              <span className='body-content-network-title'>{isFromOp ? 'Sepolia-Optimism' : 'Sepolia-Base'}</span>
            </div>
            <div className='body-content-amount'>
              <span className='body-content-amount-title'>Amount</span>
              <span className='body-content-amount-value'>Balance: {topBalance}</span>
            </div>
            <input
              className='input body-content-input'
              type='number'
              ref={inputRef}
              value={amount}
              onChange={(event) => {
                console.log(event.target.value);
                setAmount(event.target.value);
              }}
            />
            

          </div>
          <div className='body-content-transform-logo' onClick={() => {
              setAmount(0);
              setIsFromOp(!isFromOp);
            }}></div>
          <div className='body-content-wrapper'>
            <div className='body-content-network'>
              <img className='body-content-network-logo' src={isFromOp ? 'https://base-sepolia.blockscout.com/assets/network_icon.svg' : 'https://optimism-sepolia.blockscout.com/assets/network_icon.svg'} alt='logo' />
              <span className='body-content-network-title'>{isFromOp ? 'Sepolia-Base' : 'Sepolia-Optimism'}</span>
            </div>
            <div className='body-content-amount'>
              <span className='body-content-amount-title'>Amount</span>
              <span className='body-content-amount-value'>Balance: {bottomBalance}</span>
            </div>
            <input
              className='input body-content-input'
              disabled
              placeholder='You will receive'
              type='number'
              value={amount}
            />
          </div>
          <span className='btn' onClick={() => {
            const click = async () => {
              if(!metamaskConnected) return;
              try {
                const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                if (isFromOp && chainId !== '0xaa37dc') {
                  await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0xaa37dc' }],
                  });
                } else if (!isFromOp && chainId !== '0x14a34') {
                  await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x14a34' }],
                  });
                }
                const web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
                const accounts = await web3.eth.getAccounts();
                const contract = new web3.eth.Contract(ABI.BRIDGE_ABI, isFromOp ? Address.opBridgeContract : Address.baseBridgeContract);
                const channel = web3.utils.padRight(web3.utils.asciiToHex(isFromOp ? "channel-10" : "channel-11"), 64);
                setIsLoading(true);
                await contract.methods.crossChainBridge(
                  isFromOp ? Address.baseBridgeContract : Address.opBridgeContract,
                  channel,
                  getBigUnitNum(amount)
                ).send({ from: accounts[0] });

                setTimeout(() => {
                  setIsLoading(false);
                  queryBaseBalance(accounts[0], setBaseBalance, setBaseTokenSymbol)
                  queryOpBalance(accounts[0], setOpBalance, setOpTokenSymbol)
                }, 35000)

                console.log('send cross chain tx successful');
              } catch (error) {
                setIsLoading(false);
                console.error('send cross chain tx failed', error);
              }
            }
            click();
          }}>
            Transfer
          </span>
          <div className='body-content-bottom'>
            <span className='body-content-title-bottom'>Estimated Time:</span>
            <span className='body-content-title-bottom'>35 seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
