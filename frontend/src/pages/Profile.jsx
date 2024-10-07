import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loder from "../components/Loder/Loder";
import MobileNav from "../components/Profile/MobileNav";
import SideBar from "../components/Profile/SideBar";

export default function Profile() {
  const [profile, setProfile] = useState();
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
    <div className="bg-zinc-900 px-2 flex flex-col md:px-12 md:flex-row w-full  py-8 gap-4 text-white">
      {!profile && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loder />
        </div>
      )}

      {profile && (
        <>
          {" "}
          <div className="w-full md:w-1/6 h-auto lg:h-screen">
            <SideBar data={profile} />
            <MobileNav />
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}
