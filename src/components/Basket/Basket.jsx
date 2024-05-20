import React, { useEffect, useState } from "react";
import { useRootContext } from "../../context/RootContext";
import BasketCard from "../BasketCard";
import emptyCard from "../../assets/images/emptyCart.webp";
import imgLoad from "../../assets/images/load.svg";
import { FcApproval } from "react-icons/fc";
import axios from "axios";
import { IoIosCloseCircle } from "react-icons/io";

function Basket(props) {
  const { basket } = useRootContext();

  // ! MODAL
  const [modal, setModal] = useState(false);
  const [load, setLoad] = useState(false);
  const [correct, setCorrect] = useState(true);

  // ! input values

  const [userName, setUserName] = useState("");
  const [userAdress, setUserAdress] = useState("");
  const [userPhone, setUserPhone] = useState("");

  let sumPrice = basket.reduce((acc, el) => acc + el.price * el.quantity, 0);

  function submitToTelegram() {
    if (
      userName.length !== 0 &&
      userAdress.length !== 0 &&
      userPhone.length !== 0 &&
      userPhone.includes("+996") &&
      userPhone.length == 13
    ) {
      const my_id = `-1002037482326`;
      const token = `6864039082:AAGUHJZOdhXH1ExMXFioRi3O1TXd_md4-fw`;
      const url_api = `https://api.telegram.org/bot${token}/sendMessage`;

      const newProduct = {
        chat_id: my_id,
        parse_model: "html",
        text: `
      user-validate:
      Name: ${userName},
      address: ${userAdress},
      phone: ${userPhone}
      `,
      };
      setTimeout(() => {
        axios.post(url_api, newProduct);
        setLoad(false);
      }, 3000);
      setUserName("");
      setUserAdress("");
      setUserPhone("");
    } else {
      alert("введите правильные данные");
    }
  }
  function resetState() {
    setLoad(false);
    setCorrect(true);
  }
  useEffect(() => {
    resetState();
  }, [modal]);

  return (
    <div className="py-[50px]">
      <div className="container">
        <div className=" overflow-x-auto shadow-md sm:rounded-lg">
          {basket.length ? (
            <div className="">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product IMG
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      QUANTITY
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {basket.map((el, idx) => (
                    <BasketCard el={el} key={idx} />
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end width-[100%] my-[15px]">
                <span className=" text-black text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-2xl px-5 py-2.5 text-center me-2 mb-2">
                  total price: {Math.floor(sumPrice)}$
                </span>
              </div>
              <div
                style={{
                  display: modal ? "flex" : "none",
                }}
                className="modal"
              >
                <div className="modalBox">
                  <div
                    style={{
                      display: correct ? "flex" : "none",
                    }}
                    className="correct"
                  >
                    <h1>проверьте данные</h1>
                    {userName.length !== 0 && userAdress.length !== 0 ? (
                      <p>
                        {userName}, {userAdress}, {userPhone}
                      </p>
                    ) : null}
                    <button
                      onClick={() => {
                        setCorrect(false);
                        setLoad(true);
                        submitToTelegram();
                      }}
                      type="button"
                      class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Подвердить
                    </button>
                  </div>
                  <div
                    style={{
                      display: load ? "flex" : "none",
                    }}
                    className="load"
                  >
                    <img src={imgLoad} alt="" />
                  </div>
                  {!load && !correct ? (
                    <div className="succes">
                      <h1>ваш заказ принят ожидайте</h1>
                      <button>
                        <FcApproval />
                      </button>
                    </div>
                  ) : null}
                  <button onClick={() => setModal(false)} className="x">
                    <IoIosCloseCircle />
                  </button>
                </div>
              </div>

              <div className="w-[40%] mx-auto flex items-center justify-center flex-col gap-5">
                <h1>Sumbmit Telegram</h1>
                <div class="mb-5">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User Name
                  </label>
                  <input
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    type="text"
                    id="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                  />
                </div>
                <div class="mb-5">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User Adress
                  </label>
                  <input
                    onChange={(e) => setUserAdress(e.target.value)}
                    value={userAdress}
                    type="text"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                  />
                </div>
                <div class="mb-5">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User phone
                  </label>
                  <input
                    onChange={(e) => setUserPhone(e.target.value)}
                    onClick={() => {
                      setUserPhone("+996");
                    }}
                    maxLength={13}
                    value={userPhone}
                    type="text"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                  />
                </div>
                <button
                  onClick={() => setModal(true)}
                  class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Sumbmit
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex item-center justify-center py-[50px]">
              <img src={emptyCard} alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Basket;
