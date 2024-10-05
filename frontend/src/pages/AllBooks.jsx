import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard/BookCard";
import Loder from "../components/Loder/Loder";
export default function AllBooks() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-all-books"
        );
        setData(response.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 h-auto px-12 py-8">
      {" "}
      <h4 className="text-3xl text-yellow-100">All books</h4>
      {!data && (
        <div className="w-full h-screen flex items-center justify-center">
          <Loder />{" "}
        </div>
      )}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8 ">
        {data &&
          data.map((item, i) => (
            <div key={i}>
              <BookCard data={item} />
            </div>
          ))}
      </div>
    </div>
  );
}
