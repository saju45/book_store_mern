import axios from "axios";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { IoOpenOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Loder from "../components/Loder/Loder";
import SeeUserData from "./SeeUserData";

export default function AllOrders() {
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState();
  const [value, setValue] = useState({ status: "" });
  const [allOrders, setAllOrders] = useState();
  const [options, setOptions] = useState();

  const handleChange = (event) => {
    const { value } = event.target;
    setValue({ status: value });
  };

  const submitChange = async (i) => {
    try {
      const id = allOrders[i]?._id;
      const response = await axios.put(
        `http://localhost:1000/api/v1/update-status/${id}`,
        value,
        { headers }
      );

      alert(response.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-all-order",
          { headers }
        );

        setAllOrders(response.data.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  return (
    <>
      {!allOrders && (
        <div className="h-[100%] flex items-center justify-center">
          <Loder />
        </div>
      )}
      {allOrders && allOrders?.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100 ">
          <h1 className=" text-3xl lg:text-5xl text-zinc-500 font-semibold mb-8">
            All Orders
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
              <FaUserLarge />
            </div>
          </div>

          {allOrders?.map((item, i) => (
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
                <h1 className="font-semibold ">
                  <button
                    className="hover:scale-105 transition-all duration-300"
                    onClick={() => setOptions(i)}
                  >
                    {item.status === "Order Placed" ? (
                      <div className="text-yellow-500">{item.status}</div>
                    ) : item.status === "Cancelled" ? (
                      <div className="text-red-500">{item.status}</div>
                    ) : (
                      <div className="text-green-500">{item.status}</div>
                    )}
                  </button>
                  <div className={`${options === i ? "flex" : "hidden"}`}>
                    <select
                      name="status"
                      onChange={handleChange}
                      id=""
                      className="bg-gray-800"
                    >
                      {[
                        "Place Orderd",
                        "Out for delivery",
                        "Delivered",
                        "Cancelled",
                      ].map((item, i) => (
                        <option value={item} key={i}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <button
                      className="text-green-500 hover:text-pink-600 mx-2"
                      onClick={() => {
                        setOptions(-1);
                        submitChange(i);
                      }}
                    >
                      <FaCheck />
                    </button>
                  </div>
                </h1>
              </div>

              <div className="w-[10%] md:w-[5%]">
                <button
                  className="text-xl hover:text-orange-500"
                  onClick={() => {
                    setUserDiv("fixed");
                    setUserDivData(item?.user);
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {userDivData && (
        <SeeUserData
          userDiv={userDiv}
          userDivData={userDivData}
          setUserDiv={setUserDiv}
        />
      )}
    </>
  );
}
