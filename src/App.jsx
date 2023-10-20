import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Style from "./App.module.css";
import Search from "./page/Search/Search";
import ResultPage from "./page/Resultpage/Resultpage";
import axios from "axios";

export const UserContext = createContext();

function App() {
  const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/`);
      if (response) {
        const data = response.data;
        setProducts(data.products);
      }
    } catch (error) {
      console.log("error fetching product", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className={Style.App}>
      <UserContext.Provider value={{ products }}>
        <Router>
          <Routes>
            <Route path="/" index element={<Search />} />
            <Route path="/search" element={<Search />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
