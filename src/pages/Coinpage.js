import { Container, LinearProgress, Typography} from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CoinInfo from '../components/banner/CoinInfo';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import parse from 'html-react-parser';

const useStyles = makeStyles(() => ({
    container: {
    },
    sidebar: {
      width: "30%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: '800',
      marginBottom: 20,
      fontFamily: "var(--font-family)",
    },
    description: {
      width: "100%",
      fontFamily: "var(--font-family)",
      fontSize: 15,
      padding: 25,
      paddingBottom: 15,
      textAlign: "justify", 
    }
}));

function Coinpage() {

  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();
  if(!coin) return <LinearProgress style={{ backgroundColor: 'yellow'}} />

  return (
    <Container className={classes.container} style={{
      width:'100%',
      display: 'flex',
      color: "#fff !important",
    }}>
      <div className={classes.sidebar}>
        <img 
          src={coin?.image.large}
          alt={coin?.name}
          height= '200'
          style={{marginBottom: 20}}
        />
        <Typography
          variant='h3' className={classes.heading}
          style={{
      fontWeight: '800',
      marginBottom: 20,
      fontFamily: "var(--font-family)",
    }}> {coin?.name}</Typography>

    <Typography variant='subtitle1' className={classes.description}
    style={
      {
        width: "100%",
        fontFamily: "var(--font-family)",
        fontSize: 20,
        padding: 25,
        paddingBottom: 15,
        textAlign: "justify", 
      }
    }
    >
      {parse(String(coin?.description.en.split(". ")[0]))}.
    </Typography>
    <div>
      <span style={{display: 'flex'}}>
        <Typography variant='h5' style={{fontFamily: "var(--font-family)", fontWeight:800,}}>
          Rank:  
        </Typography>
        <Typography variant='h5' 
        style={{fontFamily: "var(--num)"}}>
            &nbsp;&nbsp; {coin?.market_cap_rank}
        </Typography>
      </span>
      <span style={{display: 'flex'}}>
        <Typography variant='h5' style={{fontFamily: "var(--font-family)", fontWeight:800,}}>
          Current Market Price:  
        </Typography>
        <Typography variant='h5' 
        style={{ fontWeight: 500, fontFamily:'var(--num)',}}>
            &nbsp;&nbsp; {symbol} {numberwithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
        </Typography>
      </span>
      <span style={{display: 'flex'}}>
        <Typography variant='h5' style={{fontFamily: "var(--font-family)", fontWeight:800,}}>
          Market Cap: {" "}
        </Typography>
        <Typography variant='h5' 
        style={{fontFamily: "var(--num)"}}>
            &nbsp;&nbsp; {symbol}&nbsp;{numberwithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0. -6))}M
        </Typography>
      </span>
    </div>
    
      </div>

      <CoinInfo coin={coin} />
    </Container>
  );
}

export default Coinpage
export function numberwithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
