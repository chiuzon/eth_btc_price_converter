import { Component, createSignal } from "solid-js";

import styles from "./App.module.css";

async function fetchPriceInUSD() {
  //https://api.coingecko.com/api/v3/simple/price?ids=bitcoin;ethereum&vs_currencies=usd

  return await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
  ).then((response) => response.json());
}

const App: Component = () => {
  const [bitcoinAmount, setBitcoinAmount] = createSignal(0);
  const [ethAmount, setEthAmount] = createSignal(0);

  let btcInput: any;
  let ethInput: any;

  async function convert(ev: any) {
    const { bitcoin, ethereum } = await fetchPriceInUSD();

    if (ev.target === btcInput) {
      //ev.target.value
      // console.log("Converting from BTC to ETH");
      //btc_amount * (1_btc_price / 1_eth_price) = btc_amount_to_eth

      setEthAmount(parseFloat(ev.target.value) * (bitcoin.usd / ethereum.usd));
    } else {
      setBitcoinAmount(
        parseFloat(ev.target.value) * (ethereum.usd / bitcoin.usd)
      );
    }
  }

  return (
    <div class={styles.App}>
      <div>
        BTC:
        <input
          ref={btcInput}
          onInput={convert}
          onChange={convert}
          value={bitcoinAmount()}
        />
      </div>

      <div>
        ETH:
        <input
          ref={ethInput}
          onInput={convert}
          onChange={convert}
          value={ethAmount()}
        />
      </div>
    </div>
  );
};

export default App;
