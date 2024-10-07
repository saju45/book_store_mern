import axios from "axios";
import { useEffect, useState } from "react";
import Loder from "../Loder/Loder";

export default function Settings() {
  const [profileData, setProfileData] = useState();
  const [value, setValue] = useState({ address: "" });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setValue({ [name]: value });
  };

  const handleUpdateAddress = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/update-address",
        value,
        { headers }
      );

      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-information",
          { headers }
        );
        setProfileData(response.data);
        setValue({ address: response.data.address });
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);
  return (
    <>
      {!profileData && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loder />
        </div>
      )}

      {profileData && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            {" "}
            Settings
          </h1>

          <div className="flex gap-12">
            <div className="">
              <label htmlFor="">Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData?.username}
              </p>
            </div>

            <div className="">
              <label htmlFor="">Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData?.email}
              </p>
            </div>
          </div>

          <div className=" mt-4 flex flex-col ">
            <label htmlFor="">Address</label>
            <textarea
              rows="5"
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              placeholder="Address"
              name="address"
              value={value.address}
              onChange={handleChange}
            />
          </div>

          <div className="mt-4 flex justify-end" onClick={handleUpdateAddress}>
            <button className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300">
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
}
