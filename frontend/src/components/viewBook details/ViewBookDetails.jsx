import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaHeart, FaShoppingCart } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

import { GrLanguage } from "react-icons/gr";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loder from "../../components/Loder/Loder.jsx";

export default function ViewBookDetails() {
  const [data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();
  const { id } = useParams();
  const headers = {
    bookid: id,
    adminid: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  console.log({ headers });

  console.log(`Bearer ${localStorage.getItem("token")}`);

  const handleFavourites = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-book-to-favourite",
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCart = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-to-cart",
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:1000/api/v1/delete-book",
        { headers }
      );
      alert(response.data.message);
      navigate("/all-books");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1//get-book-by-id//${id}`
        );

        setData(response.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, [id]);

  return (
    <>
      {!data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loder />
        </div>
      )}
      <div className="px-4 lg:px-12 py-8 bg-zinc-900  flex flex-col lg:flex-row gap-8">
        <div className="px-4 h-[60vh] lg:h-[88vh] w-full lg:w-3/6  ">
          <div className="flex flex-col lg:flex-row justify-around bg-zinc-800 py-12 rounded">
            <img
              src={data?.url}
              alt="/"
              className=" h-[30vh] md:h-[60vh] lg:h-[70vh] rounded"
            />

            {isLoggedIn === true && role === "user" && (
              <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0">
                <button
                  className="bg-white rounded lg:rounded-full text-3xl md:p-3 p-2 text-red-500 flex items-center justify-center"
                  onClick={handleFavourites}
                >
                  <FaHeart />{" "}
                  <span className="ms-4 block lg:hidden">Favourites</span>
                </button>
                <button
                  className="text-white rounded lg:rounded-full mt-8 md:mt-0 text-3xl p-2 ms-4 md:ms-0 lg:mt-4  bg-blue-500 flex items-center justify-center"
                  onClick={handleCart}
                >
                  <FaShoppingCart />{" "}
                  <span className="ms-4 block lg:hidden">Add to cart</span>
                </button>
              </div>
            )}

            {isLoggedIn === true && role === "admin" && (
              <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0">
                <button
                  className="bg-white rounded lg:rounded-full text-3xl md:p-3 p-2  flex items-center justify-center"
                  onClick={() => {
                    navigate(`/update-book/${id}`);
                  }}
                >
                  <FaEdit /> <span className="ms-4 block lg:hidden">Edit</span>
                </button>
                <button
                  className="text-red-500 rounded lg:rounded-full text-3xl p-2 ms-4 md:ms-0 lg:mt-4 mt-8 md:mt-0 bg-white flex items-center justify-center"
                  onClick={handleDelete}
                >
                  <MdDeleteOutline />{" "}
                  <span className="ms-4 block lg:hidden">Delete Book</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="p-4 w-full lg:w-3/6">
          <h1 className="text-4xl text-zinc-300 font-semibold">
            {data?.title}
          </h1>
          <p className="text-zinc-400 mt-1">by {data?.author}</p>
          <p className="text-zinc-500 mt-4 text-xl"> {data?.desc}</p>

          <p className="flex mt-4 items-center justify-start text-zinc-400 ">
            <GrLanguage className="me-3" /> {data?.language}
          </p>
          <p className="text-3xl font-semibold text-zinc-400 mt-4">
            Price : ৳ {data?.price}
          </p>
        </div>
      </div>
    </>
  );
}
