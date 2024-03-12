import { useEffect, useState } from "react";
import { Route, useParams } from "react-router";
import { useLocation, Routes, Link , useMatch, Outlet} from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";


const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface RouterState {
    state:{
      name:string;
    };
  }


  interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
  }
  
  interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      };
    };
  }
function Coin() {
  const {coinId} = useParams(); 
  //useParams쓰는 순간 타입이 string or undefined로 정의 됨.
  const [loading, setLoading] = useState(true);
  const {state} = useLocation() as RouterState;
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  useEffect(() => {
    (async() => {
      const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
      const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]);
  
  return (
    <Container>
      <Header>
        <Title>{state?.name ? state.name || "Loading.." : info?.name}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>
          
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Outlet />

          {/* <Routes>
            <Route path="chart" element={<Chart />} />
            <Route path="price" element={<Price />} />
          </ Routes> */}  
          {/* --> 이렇게 하니 페이지가 넘어가버림 */}
        </>
      )}
    </Container>
  );
}


export default Coin;

// https://ui.dev/react-router-nested-routes/ (참고)
// v6에서 nested routes를 구현하는 방법은 두 가지가 있습니다.
// 첫 번째는 부모 route의 path 마지막에 /*를 적어 명시적으로 이 route의 내부에서 nested route가 render 될 수 있음을 표시하고 자식 route를 부모 route의 element 내부에 작성하는 방법입니다.
// router.tsx에서
// <Route path="/:coinId/*" element={<Coin/>} />
// Coin.tsx에서
// <Routes>
// <Route path="chart" element={<Chart />} />
// <Route path="price" element={<Price />} />
// </ Routes>
// Routes가 상대경로도 지원하기 때문에 path="chart"와 같이 써도 동작한다고 하네요.
// 두 번째 방법은 자식 route를 부모 element의 내부가 아닌 route 내부에 작성하는 방법입니다.
// 코드는 다음과 같이 작성합니다.
// router.tsx에서
// chart와 price 컴포넌트를 import하고
// <Route path="/:coinId" element={<Coin />} >
// <Route path="chart" element={<Chart />} />
// <Route path="price" element={<Price />} />
// </Route>
// 그리고 이 자식 Route들이 어디에 render 될지 부모의 element안에 Outlet을 이용해 표시해주면 됩니다.
// Coin.tsx에서, react-router-dom에서 Outlet을 import하고
// Overview와 Container 사이에 <Outlet />를 작성해주면 끝납니다.