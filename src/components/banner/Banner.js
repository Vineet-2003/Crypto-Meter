import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/system';
import React from 'react'
import Carousel from './Carousel';


const useStyles =  makeStyles(() => ({
    banner: {
        background: 'radial-gradient(circle, rgba(33,25,56,1) 0%, rgba(71,29,101,1) 50%, rgba(33,25,56,1) 100%)',

    },
    bannerContent:{
        height:400,
        display:'flex',
        flexDirection:'column',
        paddingTop:25,
        justifyContent:'space-around',
        alignContent: 'center',
    },
    tagline: {
        display: 'flex',
        height: "40%",
        flexDirection: 'column',
        justifyContent:'center',
        textAlign: 'center', 
    }
}))
const Banner = () => {
    const classes = useStyles();
  return (
    <>
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    <Typography
                        variant='h2'
                        style={{
                            fontWeight: '500',
                            marginBottom: 20,
                            fontFamily:'var(--font-family)',
                            textAlign: 'center',
                        }}
                    >Crypto Meter</Typography>
                    <Typography
                    style={{
                            fontWeight: '500',
                            marginBottom: 20,
                            fontFamily:'var(--font-family)',
                            textAlign: 'center',
                            color:'#ACACBE',
                        }}
                    >
                        Stay on top of your crypto game with real-time insights and analytics.
                    </Typography>
                </div>
                <Carousel />
            </Container>
        </div>
    </>
  )
}

export default Banner