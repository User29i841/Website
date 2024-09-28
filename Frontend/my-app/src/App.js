
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import CoinFlip from './pages/CoinFlip'
import NavBar from './components/Navbar'
import SideBar from './components/SideBar'

function App() {
  return (
    <>
    <BrowserRouter>
    <NavBar />
      <SideBar>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/coinflip' element={<CoinFlip/>}/>
        </Routes>
      </SideBar>
    </BrowserRouter>
    </>
  );
}

export default App;