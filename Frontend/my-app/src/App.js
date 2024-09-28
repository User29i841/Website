import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CoinFlip from './pages/CoinFlip';
import NavBar from './components/Navbar';
import SideBar from './components/SideBar';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <SideBar>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/coinflip' element={<CoinFlip />} />
            <Route path='*' element={<PageNotFound />} /> 
          </Routes>
        </SideBar>
      </BrowserRouter>
    </>
  );
}

export default App;