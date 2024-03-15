import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
} 


function Chart()  { 
  const {coinId} = useOutletContext<ChartProps>();
  const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], ()=> fetchCoinHistory(coinId));
  const candlestickData =
    data?.map((price) => ({
      x: new Date(price.time_close * 1000).toUTCString(),
      y: [price.open, price.high, price.low, price.close],
    })) || [];
  return (
    <div>
      {isLoading? "Loding Chart.." : 
      // <ReactApexChart
      // type="line"
      // series={[
      //   {
      //     name: "Price",
      //     data: data?.map((price) => Number(price.close)) ?? []
      //   },
      // ]}
      // options={{
      //   theme: {
      //     mode: "dark",
      //   },
      //   chart: {
      //     height: 300,
      //     width: 500,
      //     toolbar: {
      //       show: false,
      //     },
      //     background: "transparent",
      //   },
      //   // grid: { show: false },
      //   grid: {
      //     borderColor : "gray"
      //   },
      //   stroke: {
      //     curve: "smooth",
      //     width: 4,
      //   },
      //   yaxis: {
      //     show: false,
      //   },
      //   xaxis: {
      //     axisBorder: { show: false },
      //     axisTicks: { show: false },
      //     labels: { show: false },
      //     type: "datetime",
      //     categories: data?.map((price) => new Date(price.time_close * 1000).toUTCString()),
      //   },
      //   fill: {
      //     type : "gradient",
      //     gradient : {
      //       gradientToColors : ["blue"],
      //       stops : [0, 100]
      //     } 
      //   },
      //   colors: ["red"],
      //   tooltip: {
      //     y : {
      //       formatter : (value) => `$${value.toFixed(2)}`, //소수점 두자리까지만 보여주기
      //     }
      //   }
      // }}
      // />
      <ReactApexChart
        type="candlestick"
        series={[
          {
            name: "Price",
            data: candlestickData 
          },
        ]}
        options={{
          theme: {
            mode: "dark" ,
          },
          chart: {
            height: 300,
            width: 500,
            toolbar: { show: false },
            background: "transparent",
          },
          plotOptions: {
            candlestick: {
              colors: {
                upward: "#f96868",
                downward: "#6896f9",
              },
            },
          },
          grid: { show: false },
          xaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { show: true, rotate: 0 },
            type: "datetime",
          },
          yaxis: { show: false },
        }}
      />
      }
    </div>
  )

}




export default Chart;

// 넘어오는 data가 string형식이기 때문에 
// Overload 에러를 해결하는 두가지 해결법
// 1. data: data?.map((price) => Number(price.close)) as number[]
// 2. data: data?.map((price) => Number(price.close)) ?? []

// 첫번째는 타입 캐스팅(as)를 사용해 강제 형변환을 하는 방식
// → 하지만 데이터가 null 또는 undefined일 때 에러가 발생할 수 있음.

// 두번째는 Nullish Coalescing 연산자 (??)를 사용하여 빈 배열을 반환하는 방식
// → 데이터가 null 또는 undefined일 때 안전하게 빈 배열 반환해 에러 방지.
// → 하지만 TypeScript에서 배열의 타입을 명시적으로 지정하지 않았음.