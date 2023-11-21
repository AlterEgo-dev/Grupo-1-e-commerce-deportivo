import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Products } from './components/products/products';
import { Home } from './components/home/Home';
import './App.css';
import { Users } from './components/users/Users';
import { TotalProducts } from './components/productsComponents/TotalProducts';
import { UltimoProduct } from './components/productsComponents/UltimoProduct';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path='productos' element={<UltimoProduct/>}/>
            <Route path='users' element={<Users/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;