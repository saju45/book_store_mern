import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function UpdateBook() {
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const headers = {
    bookid: id,
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleUpdateBook = async () => {
    console.log(data);

    try {
      if (
        data.url === "" ||
        data.title === "" ||
        data.author === "" ||
        data.price === "" ||
        data.desc === "" ||
        data.language === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.put(
          "http://localhost:1000/api/v1/update-book",
          data,
          { headers }
        );

        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
        alert(response.data.message);
        navigate(`/view-book-details/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1//get-book-by-id/${id}`
        );

        setData(response.data?.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, [id]);

  return (
    <div className="bg-zinc-900 text-white h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Edit Book
      </h1>

      <div className="p-4 bg-zinc-800 rounded">
        <div>
          <label htmlFor="">Image</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 p-2 outline-none"
            placeholder="url of Image"
            name="url"
            required
            value={data?.url}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="">Title to book</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 p-2 outline-none"
            placeholder="title of book"
            name="title"
            required
            value={data?.title}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="">Author of book</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 p-2 outline-none"
            placeholder="author of book"
            name="author"
            required
            value={data?.author}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4 flex  gap-4">
          <div className="w-3/6">
            <label htmlFor="">Language</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 p-2 outline-none"
              placeholder="language of book"
              name="language"
              required
              value={data?.language}
              onChange={handleChange}
            />
          </div>

          <div className="w-3/6">
            <label htmlFor="">Price</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 p-2 outline-none"
              placeholder="price of book"
              name="price"
              required
              value={data?.price}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="">Description of book</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 p-2 outline-none"
            placeholder="desction of book"
            name="desc"
            required
            value={data?.desc}
            onChange={handleChange}
          />
        </div>

        <button
          className="mt-4 px-3 bg-blue-500 text-white font-semibold rounded  hover:bg-blue-600  transition-all duration-300"
          onClick={handleUpdateBook}
        >
          Update Book
        </button>
      </div>
    </div>
  );
}
