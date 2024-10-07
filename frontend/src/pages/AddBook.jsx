import axios from "axios";
import { useState } from "react";
export default function AddBook() {
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
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
        const response = await axios.post(
          "http://localhost:1000/api/v1/add-book",
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Add Book
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
          onClick={handleSubmit}
        >
          Add Book
        </button>
      </div>
    </div>
  );
}
