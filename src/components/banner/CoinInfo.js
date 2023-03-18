import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HistoricalChart } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import CircularProgress from '@mui/material/CircularProgress';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { chartDays } from '../../config/data';
import SelectButton from './SelectButton';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const CoinInfo = ({ coin }) => {

  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  }
 useEffect( () => {
  fetchHistoricalData();
  // eslint-disable-next-line
 }, [currency, days]);

 const darkTheme = createTheme({
    palette: {
      priamry: {
        main: "#fff",
      },
      type: "dark",
    },
 });
  return (
    <ThemeProvider theme={darkTheme}>
    <div style={{
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      // marginTop: 10,
      padding: 20,
    }}>
        {


          !historicalData ? (
            <CircularProgress 
              style={{
                color: "yellow",
              }}
              size={250}
              thickness={1}
            />
          ) : (
            <>
              <Line 
                data={{
                  labels: historicalData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time = (date.getHours() > 12
                    ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
                    : `${date.getHours()} : ${date.getMinutes()} AM`);

                    return days === 1 ? time : date.toLocaleDateString();
                  }), 

                  datasets : [{
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: 'yellow',

                  }],
                }}
                options={{
                  elements: {
                    point: {
                      radius:1,
                    },
                  },
                }}
              />
              <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
                color:"#fff !important",
              }}
              > 
                  {chartDays.map((day) => {
                    return (<SelectButton key={day.value} 
                      onClick={() => setDays(day.value)} 
                      selected={day.value === days}>
                          {day.label}
                    </SelectButton>)
                  })}
              </div>
            </>
          )
        }
    </div>

    </ThemeProvider>
  )
}

export default CoinInfo;