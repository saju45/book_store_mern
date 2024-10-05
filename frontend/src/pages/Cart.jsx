import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Loder from "../components/Loder/Loder";
export default function Cart() {
  const [cart, setCart] = useState();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleDelete = async (bookId) => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/remove-book-from-cart",
        {},
        { headers: { ...headers, bookid: bookId } }
      );

      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/place-order",
        { order: cart },
        { headers }
      );
      alert(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1//get-cart-books",
          { headers }
        );
        setCart(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, [cart]);

  useEffect(() => {
    if (cart && cart?.length > 0) {
      let totalPrice = 0;
      cart?.map((item) => {
        totalPrice += item.price;
      });

      setTotal(totalPrice);
      totalPrice = 0;
    }
  }, [cart]);

  return (
    <div className="bg-zinc-900 px-12 h-screen py-8">
      {!cart && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loder />{" "}
        </div>
      )}
      {cart && cart?.length === 0 && (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className=" text-5xl lg:text-6xl text-zinc-400 font-semibold">
              Empty Cart
            </h1>
          </div>
        </div>
      )}

      {cart && cart?.length > 0 && (
        <>
          <h3 className="text-5xl font-semibold text-zinc-500 mb-8">
            Your Cart
          </h3>
          {cart?.map((item, i) => (
            <div
              className="w-full rounded my-4 flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
              key={i}
            >
              <img
                src={item.url}
                alt="/image"
                className="h-[20vh] md:h-[10vh]"
              />

              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-zinc-100 font-semibol text-start mt-2 md:mt-0">
                  {item.title}
                </h1>

                <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                  {item.desc.slice(0, 100)}...
                </p>

                <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                  {item.desc.slice(0, 65)}...
                </p>

                <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                  {item.desc.slice(0, 100)}...
                </p>
              </div>

              <div className="flex mt-4 w-full md:w-auto justify-between items-center">
                <h2 className="text-zinc-100 font-semibold text-3xl flex">
                  ৳ {item.price}
                </h2>
                <button
                  className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                  onClick={() => handleDelete(item._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {cart && cart?.length > 0 && (
        <div className="mt-4 w-full flex items-center justify-end">
          <div className="p-4 bg-zinc-800 rounded">
            <h1 className="text-3xl text-zinc-200 font-semibold ">
              Total Amount
            </h1>
            <div className="mt-3 flex items-center justify-between text-zinc-200 text-xl">
              <h2 className="">{cart?.length} books</h2> <h2>৳ {total}</h2>
            </div>
            <div className="w-[100%] mt-3">
              <button
                className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-900 hover:text-white transition-all duration-300 "
                onClick={handlePlaceOrder}
              >
                Place Your Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
