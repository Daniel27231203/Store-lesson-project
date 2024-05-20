import React, { useEffect } from "react";
import { useRootContext } from "../../context/RootContext";
import { MdDelete } from "react-icons/md";
import favEmpty from "../../assets/images/empty-fav.webp";

function Favorite(props) {
  const { favorite, deleteProduct, removeAll } = useRootContext();

  return (
    <div className="">
      <div className="container">
        {favorite.length ? (
          <div className="flex items-end justify-between">
            <div className="favorite flex flex-col gap-[10px] h-[600px] overflow-y-auto">
              {favorite.map((el, idx) => (
                <div key={idx} className="">
                  <a
                    href="#"
                    className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <img
                      className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                      src={el.image}
                      alt=""
                    />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {el.title}
                      </h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {el.description}
                      </p>
                    </div>
                    <button onClick={() => deleteProduct(el.id)}>
                      <MdDelete />
                    </button>
                  </a>
                </div>
              ))}
            </div>
            <button
              onClick={removeAll}
              type="button"
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-2xl px-5 py-2.5 text-center me-2 mb-2"
            >
              Remove All
            </button>
          </div>
        ) : (
          <div className="flex item-center justify-center pt-[40px]">
            <img src={favEmpty} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorite;
