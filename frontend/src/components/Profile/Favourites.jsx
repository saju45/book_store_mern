import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";
export default function Favourties() {
  const [favrioutes, setFavourites] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1//get-favourite-books",
          { headers }
        );

        setFavourites(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, [favrioutes]);

  return (
    <>
      {favrioutes.length === 0 && (
        <div className=" w-full h-[100%] text-5xl font-semibold text-zinc-500 flex items-center justify-center">
          No Favourite Books
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {favrioutes &&
          favrioutes.map((fav) => (
            <BookCard key={fav?._id} data={fav} favourite={true} />
          ))}
      </div>
    </>
  );
}
