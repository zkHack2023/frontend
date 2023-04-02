import logo from './logo.svg';
import './App.css';
import { MantaPrivateWallet, SbtMantaPrivateWallet, Environment, Network, MantaUtilities } from 'manta.js';
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { hot } from 'react-hot-loader';

console.log({MantaPrivateWallet});
console.log({SbtMantaPrivateWallet});
console.log({Environment});
console.log({Network});
console.log({MantaUtilities});

const privateWalletConfig = {
  environment: Environment.Production,
  network: Network.Manta,
}

const getPolkadotSignerAndAddress = async () => {
  const extensions = await web3Enable('Polkadot App');
  if (extensions.length === 0) {
    throw new Error("Polkadot browser extension missing. https://polkadot.js.org/extension/");
  }
  const allAccounts = await web3Accounts();
  let account = allAccounts[0];

  const injector = await web3FromSource(account.meta.source);
  const polkadotSigner = injector.signer;
  const polkadotAddress = account.address;
  return {
    polkadotSigner,
    polkadotAddress
  }
}

const privateTransferOnlySignTest = async () => {
  const privateWallet = await MantaPrivateWallet.init(privateWalletConfig);
  const polkadotConfig = await getPolkadotSignerAndAddress();

  console.log(polkadotConfig);
  console.log(privateWallet);
  return "Hello World";
}

function App() {
  privateTransferOnlySignTest()
      .then((result) => {  console.log(result);  })
      .catch((error) => {  console.log(error);  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.

        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default hot(module)(App);
