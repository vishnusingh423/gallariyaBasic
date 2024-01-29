import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from './Component/Navbar';
import "./App.css";
import Home from "./Pages/Home/Home";
import Footer from "./Component/Footer";
import Product from "./Pages/Product/Product";
import Cart from "./Pages/Cart/Cart";
import Search from "./Pages/Search/Search";
import Checkout from "./Pages/Checkout/Checkout";
import Success from "./Pages/Success/Success";
import AddProduct from "./Pages/Addproduct/AddProduct";
import AddSuccess from "./Pages/Addproduct/AddSuccess";


function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/product/:id' element={<Product />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/search/:id' element={<Search />} />
          <Route exact path='/checkout' element={<Checkout />} />
          <Route exact path='/success' element={<Success />} />
          <Route exact path='/addProduct' element={<AddProduct />} />
          <Route exact path='/addsuccess' element={<AddSuccess />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
