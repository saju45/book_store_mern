/* eslint-disable react/prop-types */
import axios from "axios";
import { Link } from "react-router-dom";

export default function BookCard({ data, favourite }) {
  const headers = {
    bookid: data?._id,
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleRemoveBook = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/remove-book-from-favourite",
        {},
        { headers }
      );
      console.log(response);

      // alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col">
      <Link to={`/view-book-details/${data._id}`}>
        <div>
          <div className="bg-zinc-900 rounded flex items-center justify-center">
            <img src={data?.url} alt="book image" className="h-[25vh]" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-white">
            {data?.title}
          </h2>
          <p className="mt-2 text-zinc-400 font-semibold ">by {data?.author}</p>
          <p className="mt-2 text-zinc-400 font-semibold text-xl">
            {" "}
            ৳ {data?.price}
          </p>
        </div>
      </Link>
      {favourite && (
        <button
          className="bg-yellow-50  px-4 py-2 rounded  border border-r-yellow-500 text-yellow-500 mt-4"
          onClick={handleRemoveBook}
        >
          Remove favourite
        </button>
      )}
    </div>
  );
}
