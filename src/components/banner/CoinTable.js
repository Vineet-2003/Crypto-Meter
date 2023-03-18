import { ThemeProvider, createTheme, TextField} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LinearProgress from '@mui/material/LinearProgress';
import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import { makeStyles } from '@mui/styles';
import {useNavigate} from 'react-router-dom';
import Pagination from '@mui/material/Pagination';




const useStyles = makeStyles(() => ({
    whiteColor: {
        color: '#fff',
    },
    textFieldColor: {
      color: '#fff !important',
    },
    row: {
      color: 'white',
      cursor: 'pointer',
      '&: hover' : {
        backgorundColor: "#565050",
      }
    },
    pagination: {
      "& .MuiPaginationItem-root" : {
        color: '#fff',
      }
    }

}))
const CoinTable = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  console.log(search);
  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#fff',
        },
        type: 'dark',
    },
  });


  // search function
  function handleSearch() {
    return coins.filter(
      (coin) => coin.name.toLowerCase().includes(search) ||
      coin.name.toLowerCase().includes(search)
    );
  }


 
    return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: 'center'}}>
            <Typography
            variant='h4'
            style={{margin: 15, fontFamily: "var(--font-family)"}}
            >
                Cryptocurrency Prices by Market Cap
            </Typography>

            <TextField 
                className={classes.whiteColor}
                label='Search For a Crypto Currency..'
                InputLabelProps={
                  {classname: classes.textFieldColor}}
                variant='outlined'
                style={{ marginBottom:20, width: "100%", backgorundColor: "#fff"}}
                onChange={(e) => setSearch(e.target.value)}
                // defaultValue="option1"
                sx={{
            color: "white",
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#fff',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#fff',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#fff',
            },
            '.MuiSvgIcon-root ': {
              fill: "white !important",
            },
          }}
         
            />
            <TableContainer>
              {
                loading ? (
                  <LinearProgress style={{
                    backgroundColor: 'yellow',
                    }}/>
                ) : (
                  <Table aria-label="simple table">
                    <TableHead style={{
                      backgroundColor: '#fff',
                      width:'100',
                      }}>
                      
                      <TableRow>
                          {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                            <TableCell
                            style={{
                              color: 'black',
                              fontWeight: '700',
                              fontFamily: 'var(--font-family)',
                              fontSize: 18,
                            }}
                            key={head}
                            align={head === "coin" ? "" : "Center"}
                            >
                            {head}
                            </TableCell>
                          ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>{handleSearch()
                    .slice((page -1) * 10, (page -1)*10 +10)
                    .map(row =>{
                      console.log("triggered");
                      const profit = row.price_change_percentage_24h > 0;

                      return (
                        <TableRow
                        onClick={() => {navigate(`/coin/${row.id}`)}}
                        className={classes.row}
                        key={row.name}
                        >
                            <TableCell
                            component='th'
                            scope='row'
                            style={{
                              display: 'flex',
                              gap:15,
                            }}
                            >
                              <img 
                                src={row?.image}
                                alt={row.name}
                                height='50'
                                style={{ marginBottom: 10}}
                              />
                              <div
                                style={{
                                  display:'flex',
                                  flexDirection: 'column'
                                }}
                              >
                                <span
                                  style={{
                                    textTransform: "uppercase",
                                    fontSize: 22,
                                    color: '#fff',
                                  }}
                                >{row.symbol}
                                </span>
                                <span
                                  style={{color: 'darkgray',}} 
                                >
                                  {row.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell
                            // align='right'
                            style={{
                              color:"#fff",
                              fontFamily:'var(--num)',
                              fontSize:18,
                            }}
                            >
                            {symbol} {numberwithCommas(row?.current_price.toFixed(2))}
                            </TableCell>


                            <TableCell
                              // align='right'
                              style={{
                                color: (profit > 0) ? "rgb(14, 203, 129)" : 'red',
                                fontWeight: "bold",
                                fontFamily:'var(--num)',
                                fontSize:18,
                              }}
                            >{profit && "+"}
                              {row.price_change_percentage_24h.toFixed(2)}%
                            </TableCell>

                            <TableCell
                            style={{
                              color:"#fff",
                              fontFamily:'var(--num)',
                              fontSize:18,
                            }}
                            >
                              {symbol}{" "}{numberwithCommas(row.market_cap.toString().slice(0,-6))}M
                            </TableCell>
                        </TableRow>
                      )
                    } )}</TableBody>
                  </Table>
                )
              }
            </TableContainer>

            <Pagination 
              count = {(handleSearch()?.length /10).toFixed(0)}
              color="primary"
              size='large'
              onChange={(_, value) => {
                setPage(value);
                window.scroll(0, 450);
              }}
            />
        </Container>
    </ThemeProvider>
  )
}

export default CoinTable;
export function numberwithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}