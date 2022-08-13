
import './App.css';
import AddCity from './addCity/addCity';
import AddCountry from './addCountry/addCountry';
import Home from './home/home';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';

function App() {
  return (<>
  <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-city" element={<AddCity />} />
      <Route path="/add-country" element={<AddCountry />} />
    </Routes>
    {/* <Home />
    <AddCountry/>
    <AddCity/> */}

  </>
  );
}

export default App;
