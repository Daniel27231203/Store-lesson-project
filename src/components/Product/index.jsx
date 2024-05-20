import { useEffect, useState } from "react";
import { useRootContext } from "../../context/RootContext";
import ProductCard from "../ProductCard";
import load from "../../assets/images/load.svg";

function Product(props) {
  const { product, getProduct, value, storeSort } = useRootContext();
  const [more, setMore] = useState(3);

  const searchFilt =
    value.length > 0
      ? product.filter((el) =>
          el.title.toLowerCase().includes(value.toLowerCase())
        )
      : product;

  useEffect(() => {
    setTimeout(() => {
      getProduct();
    }, 1000);
  }, []);

  return (
    <div className="py-[40px]">
      <div className="container">
        <form className="max-w-sm mx-auto">
          <label
            for="countries_disabled"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select an option
          </label>
          <select onChange={(e) => storeSort(e.target.value)} name="" id="">
            <option value="Cheap">Cheap</option>
            <option value="Expensive">Expensive</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </form>

        <div className="flex gap-[10px] flex-wrap justify-center">
          {!searchFilt.length ? (
            <div className="flex item-center justify center h-[70vh]">
              <img className="w-[150px]" src={load} alt="" />
            </div>
          ) : (
            searchFilt
              .slice(0, more)
              .map((el, ind) => <ProductCard el={el} key={ind} />)
          )}
        </div>
        <div className="flex item-center justify-center py-[20px]">
          <button
            onClick={() => setMore(more + 3)}
            type="button"
            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            more..
          </button>
          {more > 3 ? (
            <button
              onClick={() => setMore(more - 3)}
              type="button"
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              show
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Product;
