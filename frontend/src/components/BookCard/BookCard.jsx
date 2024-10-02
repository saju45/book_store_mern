/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
export default function BookCard({ data }) {
  console.log(data);

  return (
    <>
      <Link>
        <div className="bg-zinc-800 rounded p-4 flex flex-col">
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
    </>
  );
}
