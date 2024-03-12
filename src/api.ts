

const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) =>
    response.json()
  );
}

// 방법2
// export const fetchCoins = async() =>{
//   // 데이터 얻는법
//   // axios.get(url).then(res => console.log(res.data))
//   return await axios.get("https://api.coinpaprika.com/v1/coins").then(res => res.data);
//   }

// 방법3
// export async function fetchCoins() {
//   return await (await fetch("https://api.coinpaprika.com/v1/coins")).json();
//   }


export function fetchCoinInfo(coinId : string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinTickers(coinId : string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}