import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';

const useStyles = makeStyles((theme) => ({
    carousel: {
        height: "50%",
        display: 'flex',
        alignItems: 'center',
    },
    carouselItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        textTransform: 'uppercase',
        color: 'white',
    },

}))
const Carousel = () => {
    const [trending, setTrending] = useState([]);
    const classes = useStyles();

    const { currency, symbol } = CryptoState(); 
    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
        setTrending(data);
    }

    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]);

    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h_in_currency >= 0;
        return(
            <Link
            className={classes.carouselItem}
            to={`/coin/${coin.id}`}>
                <img 
                src={coin?.image}
                alt={coin.name}
                height="80"
                style={{
                    marginBottom: 10,
                }}
                />
                <span>{coin?.symbol}
                &nbsp;
                
                    <span style={
                        {color: ((profit >= 0) ? "#10ba10 " : "red"),}
                    }>
                        {profit && "+"}{coin?.price_change_percentage_24h_in_currency.toFixed(2)}%
                    </span>
                </span>

                <div
                style={{
                    fontSize: 18, fontWeight: 500, fontFamily:'var(--num)',}}>
                    {symbol} {numberwithCommas(coin?.current_price.toFixed(2))}
                </div>
            </Link>
        );
    })

    const responsive = {
        0: {
            items:2,
        },
        512 : {
            items: 4,
        },
    };
  return (


    <div className={classes.carousel}>
        <AliceCarousel 
            mouseTracking
            infinite
            autoPlayInterval={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            autoPlay
            items={items}
        />
    </div>
  )
}

export default Carousel
export function numberwithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}