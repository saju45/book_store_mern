import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loder from "../Loder/Loder";

export default function UserOrderHistory() {
  const [orderHistory, setOrderHistory] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-order-history",
          { headers }
        );

        setOrderHistory(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  return (
    <>
      {!orderHistory && (
        <div className="flex items-center justify-center h-[100%]">
          <Loder />
        </div>
      )}
      {orderHistory && orderHistory?.length === 0 && (
        <div className="h-[80vh] text-zinc-100 p-4">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className=" text-5xl lg:text-6xl text-zinc-500 font-semibold mb-8">
              No Order History
            </h1>
          </div>
        </div>
      )}

      {orderHistory && orderHistory?.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100 ">
          <h1 className=" text-3xl lg:text-5xl text-zinc-500 font-semibold mb-8">
            Your Order History
          </h1>

          <div className="mt-4 bg-zinc-800 w-full rounded px-4 py-2 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center"> Sr.</h1>
            </div>

            <div className="w-[22%]">
              <h1 className=""> Books</h1>
            </div>

            <div className="w-[45%]">
              <h1 className="">Description</h1>
            </div>

            <div className="w-[9%]">
              <h1 className=""> Price</h1>
            </div>

            <div className="w-[16%]">
              <h1 className="">Status</h1>
            </div>

            <div className="w-none md:w-[5%] hidden md:block">
              <h1 className="">Mode</h1>
            </div>
          </div>

          {orderHistory?.map((item, i) => (
            <div
              className="bg-zinc-800 w-full rounded px-4 py-2 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer"
              key={i}
            >
              <div className="w-[3%]">
                <h1 className="text-center"> {i + 1}</h1>
              </div>

              <div className="w-[22%]">
                <Link
                  to={`/view-book-details/${item.book._id}`}
                  className="hover:text-blue-300"
                >
                  {item.book.title}
                </Link>
              </div>

              <div className="w-[45%]">
                <h1 className="">{item.book.desc.slice(0, 50)} ...</h1>
              </div>

              <div className="w-[9%]">
                <h1 className=""> {item.book.price}</h1>
              </div>

              <div className="w-[16%]">
                <h1 className="font-semibold text-green-500">
                  {item.status === "Order Placed" ? (
                    <div className="text-yellow-500">{item.status}</div>
                  ) : item.status === "Canceled" ? (
                    <div className="text-red-500">{item.status}</div>
                  ) : (
                    item.status
                  )}
                </h1>
              </div>

              <div className="w-none md:w-[5%] hidden md:block">
                <h1 className="">Mode</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
