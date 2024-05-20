import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Product from "./components/Product";
import Favorite from "./components/Favorite/Favorite";
import Basket from "./components/Basket/Basket";
import ProductDeteils from "./pages/productDeteils";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Favorite" element={<Favorite />} />
        <Route path="/Basket" element={<Basket />} />
        <Route path="/ProductDeteils/:proID" element={<ProductDeteils />} />
      </Routes>
    </div>
  );
}

export default App;
