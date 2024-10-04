import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Loder from "../components/Loder/Loder";
import SideBar from "../components/Profile/SideBar";

export default function Profile() {
  const [profile, setProfile] = useState();
  const isLoggedId = useSelector((state) => state.auth);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-information",
          { headers }
        );
        setProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);
  return (
    <div className="bg-zinc-900 px-2 flex flex-col md:px-12 md:flex-row w-full h-screen py-8 gap-4 text-white">
      {!profile && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loder />
        </div>
      )}

      {profile && (
        <>
          {" "}
          <div className="w-full md:w-1/6">
            <SideBar data={profile} />
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}
