import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function SideBar({ data }) {
  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-[100%]">
      <div className="flex flex-col items-center justify-center">
        <img
          src={data?.avatar}
          alt="profile picture"
          className="h-[12vh] rounded-full"
        />
        <p className="mt-3 text-xl text-zinc-100 font-semibold">
          {data?.username}
        </p>
        <p className="mt-1 text-normal text-zinc-300 ">{data?.email}</p>
        <div className="w-full mt-4 h-[1px] text-normal bg-zinc-500 hidden lg:block "></div>
      </div>
      <div className="w-full flex-col items-center justify-center hidden md:flex ">
        <Link
          to="/profile"
          className="text-zinc-100 font-semibold px-2 py-2 mt-4 hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Favourites
        </Link>
        <Link
          to="/profile/orderHistory"
          className="text-zinc-100 font-semibold px-2 py-2 mt-4 hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Order History
        </Link>

        <Link
          to="/profile/settings"
          className="text-zinc-100 font-semibold px-2 py-2 mt-4 hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Settings
        </Link>
      </div>
      <button className="bg-zinc-900 w-3/6 lg:w-full text-white font-semibold px-2 py-2 mt-4 lg:mt-0 flex items-center justify-center  rounded  hover:bg-white hover:text-zinc-900 transition-all duration-300">
        Logout <FaArrowRightFromBracket className="ms-4" />
      </button>
    </div>
  );
}
