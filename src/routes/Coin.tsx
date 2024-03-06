import { useParams } from "react-router";


function Coin() {
  const {coinId} = useParams(); 
  //useParams쓰는 순간 타입이 string or undefined로 정의 됨.
  
  return <h1>Coin: {coinId}</h1>;
}

export default Coin;