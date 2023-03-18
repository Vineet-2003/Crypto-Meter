import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Coinpage from './pages/Coinpage';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(() => ({
  App: {
    background: '#11121f',
    color: '#fff',
  },
}))


function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
          <Header />
          <Routes>
            <Route path='/' element={<Homepage/>} />
            <Route path='/coin/:id' element={<Coinpage />}  />
          </Routes>
       </div>
    </BrowserRouter>
  );
}

export default App;
