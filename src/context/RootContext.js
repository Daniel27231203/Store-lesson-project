import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const StoreContext = createContext();
export const useRootContext = () => useContext(StoreContext);

function RootContext({ children }) {
  const [product, setProduct] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [basket, setBasket] = useState([]);
  const [value, setValue] = useState("");

  async function getProduct() {
    const { data } = await axios("https://fakestoreapi.com/products/");
    setProduct(data);
  }

  //! toFavorite
  function addToFavorite(id) {
    let findPro = favorite.find((el) => el.id === id.id);
    if (findPro) {
      let filterProdduct = favorite.filter((el) => el.id !== id.id);
      setFavorite(filterProdduct);
      localStorage.setItem("store", JSON.stringify(filterProdduct));
    } else {
      let favId = [...favorite, id];
      setFavorite(favId);
      localStorage.setItem("store", JSON.stringify(favId));
    }
  }

  function getLocal() {
    let resFav = JSON.parse(localStorage.getItem("store")) || [];
    let bas = JSON.parse(localStorage.getItem("basket")) || [];
    setBasket(bas);
    setFavorite(resFav);
  }

  // ! toBasket
  function addToBasket(item) {
    item.quantity = 1;
    let res = [...basket, item];
    setBasket(res);
    localStorage.setItem("basket", JSON.stringify(res));
  }

  function incrementQuantity(item) {
    let changeBasket = basket.map((el) =>
      el.id === item.id ? { ...el, quantity: el.quantity + 1 } : el
    );
    setBasket(changeBasket);
  }

  function decrementQuantity(item) {
    let changeBasket = basket.map((el) =>
      el.id === item.id
        ? { ...el, quantity: el.quantity > 1 ? el.quantity - 1 : 1 }
        : el
    );
    setBasket(changeBasket);
  }

  // ! delete

  function deleteProduct(id) {
    let resFav = JSON.parse(localStorage.getItem("store")) || [];
    let del = resFav.filter((e) => id !== e.id);
    localStorage.setItem("store", JSON.stringify(del));
    getLocal();
  }

  function deleteOnBasket(item) {
    let filtBas = JSON.parse(localStorage.getItem("basket")) || [];
    let del = filtBas.filter((e) => e.id !== item.id);
    localStorage.setItem("basket", JSON.stringify(del));
    getLocal();
  }

  function removeAll() {
    setFavorite([]);
    localStorage.removeItem("store");
  }

  // ! sorted

  function storeSort(item) {
    if (item === "Cheap") {
      const sortProduct = [...product].sort((a, b) => a.price - +b.price);
      setProduct(sortProduct);
    } else if (item === "Expensive") {
      const sortProduct = [...product].sort((a, b) => b.price - +a.price);
      setProduct(sortProduct);
    } else if (item === "A-Z") {
      const sortProduct = [...product].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setProduct(sortProduct);
    } else if (item === "Z-A") {
      const sortProduct = [...product].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
      setProduct(sortProduct);
    } else {
      getProduct();
    }
  }

  useEffect(() => {
    getLocal();
  }, []);

  let values = {
    product,
    setProduct,
    favorite,
    setFavorite,
    getProduct,
    addToFavorite,
    getLocal,
    deleteProduct,
    removeAll,
    basket,
    setBasket,
    addToBasket,
    deleteOnBasket,
    value,
    setValue,
    incrementQuantity,
    decrementQuantity,
    storeSort,
  };

  return (
    <StoreContext.Provider value={values}>{children}</StoreContext.Provider>
  );
}

export default RootContext;
