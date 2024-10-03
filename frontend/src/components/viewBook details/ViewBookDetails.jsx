import axios from "axios";
import { useEffect, useState } from "react";
import { GrLanguage } from "react-icons/gr";
import { useParams } from "react-router-dom";
import Loder from "../../components/Loder/Loder.jsx";

export default function ViewBookDetails() {
  const [data, setData] = useState();
  const { id } = useParams();
  console.log({ id });

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-book-by-id/${id}`
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
      <div className="px-4 lg:px-12 py-8 bg-zinc-900  flex flex-col md:flex-row gap-8">
        <div className="bg-zinc-800 rounded p-4 h-[60vh] lg:h-[88vh] w-full lg:w-3/6 flex items-center justify-center">
          <img
            src={data?.url}
            alt="/"
            className=" h-[50vh] lg:h-[70vh] rounded"
          />
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
