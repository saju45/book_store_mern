import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";
import Loder from "../Loder/Loder";
export default function RecentlyAdded() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-recent-books"
        );
        setData(response.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  return (
    <div className="mt-8 px-4 ">
      <h4 className="text-3xl text-yellow-100">Recently added books</h4>
      {!data && (
        <div className="flex items-center justify-center my-8">
          <Loder />
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
