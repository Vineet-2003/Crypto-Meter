import { AppBar, createTheme, Menu, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { makeStyles, StylesProvider } from '@mui/styles';
import {useNavigate} from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
const useStyles = makeStyles(() =>( {
  title: {
    fontFamily: 'var(--font-family)' ,
    fontWeight: "500",
    fontSize: '2rem',
    cursor: 'pointer',
  },
  typo:{
    flex:1,
    color:'white',
    fontFamily: 'var(--font-family)' ,
    fontWeight: "500",
    fontSize: '2rem',
    cursor: 'pointer', 
  },
  select: {
    width: 100,
    height: 40,
    marginRight: 15,
  },
}))


function Header() {
  const navigate = useNavigate();
  const classes = useStyles();

  const { currency, setCurrency} = CryptoState();
  console.log(currency);
  
  const darkTheme = createTheme({
    palette: {
      primary:{
        main: '#fff',
      },
      type: 'dark',
    }
  })
  return (
    <ThemeProvider theme={darkTheme}>
      <StylesProvider injectFirst>
        <AppBar color='transparent' position='static'>
          <Container>
            <Toolbar>
              <Typography className={classes.typo} onClick={() => navigate("/")}>
                <div className={classes.title}>Crypto Meter</div>
              </Typography>


              <Select 
              value={"currency"}
                variant={'outlined'}
                className={classes.select}
                onChange={(e) => {setCurrency(e.target.value) 
                console.log(currency)}}
                labelStyle={{ color: '#fff' }}
          sx={{
            color: "white",
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '.MuiSvgIcon-root ': {
              fill: "white !important",
            }
          }}
                >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
              </Select>
            </Toolbar>
          </Container>
        </AppBar>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default Header