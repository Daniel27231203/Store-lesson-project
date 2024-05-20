import React from "react";
import { useRootContext } from "../../context/RootContext";

function BasketCard({ el }) {
  const { deleteOnBasket, incrementQuantity, decrementQuantity } =
    useRootContext();

  return (
    <tr className="odd:bg-white text-2xl odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <img src={el.image} alt="" width={100} />
      </th>
      <td className="px-6 py-4">{el.title.slice(0, 20)}</td>
      <td className="px-6 py-4 flex item-center justify-center gap-4 mt-[55px]">
        <button onClick={() => decrementQuantity(el)}>-</button>
        <h1>{el.quantity}</h1>
        <button onClick={() => incrementQuantity(el)}>+</button>
      </td>
      <td className="px-6 py-4">${el.price * el.quantity}</td>
      <td className="px-6 py-4">
        <button
          onClick={() => deleteOnBasket(el)}
          type="button"
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-2xl px-5 py-2.5 text-center me-2 mb-2"
        >
          delete
        </button>
      </td>
    </tr>
  );
}

export default BasketCard;
