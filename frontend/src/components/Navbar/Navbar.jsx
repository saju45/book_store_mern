import { useState } from "react";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [movileNav, setMovileNav] = useState("hidden");
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log({ isLoggedIn });

  if (isLoggedIn === false) {
    links.splice(2, 2);
  }

  return (
    <>
      <nav className=" z-50 relative bg-zinc-800 text-white px-4 py-4 flex items-center justify-between ">
        <Link to="/" className="flex items-center">
          <img
            className="h-10 m-4"
            src="https://png.pngtree.com/png-vector/20220521/ourmid/pngtree-open-book-logo-png-image-png-image_4699354.png"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">BookHeaven</h1>
        </Link>

        <div className="nav-links-bookheaven block md:flex items-center gap-4 ">
          <div className="hidden md:flex gap-4">
            {links.map((item, i) => (
              <div className="flex items-center" key={i}>
                {item.title === "Profile" ? (
                  <Link
                    to={item.link}
                    className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <Link
                    to={item.link}
                    className="hover:text-blue-500 transition-all duration-300"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="hidden md:flex gap-4">
            {isLoggedIn === false && (
              <>
                <Link
                  to="/login"
                  className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                >
                  LogIn
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 "
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
          <button
            className="md:hidden text-white text-2xl hover:text-zinc-400"
            onClick={() =>
              movileNav === "hidden"
                ? setMovileNav("block")
                : setMovileNav("hidden")
            }
          >
            <FaGripLines />
          </button>
        </div>
      </nav>

      <div
        className={` ${movileNav} absolute top-0 left-0 w-full z-40 bg-zinc-800 h-screen flex flex-col items-center justify-center `}
      >
        {links.map((item, i) => (
          <Link
            to={item.link}
            onClick={() =>
              movileNav === "hidden"
                ? setMovileNav("block")
                : setMovileNav("hidden")
            }
            key={i}
            className="text-white text-4xl font-semibold mb-8 hover:text-blue-500 transition-all duration-300"
          >
            {item.title}
          </Link>
        ))}

        {isLoggedIn === false && (
          <>
            <Link
              to="/login"
              onClick={() =>
                movileNav === "hidden"
                  ? setMovileNav("block")
                  : setMovileNav("hidden")
              }
              className="mb-4 px-8 py-2  text-3xl font-semibold border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300"
            >
              LogIn
            </Link>
            <Link
              to="/signup"
              onClick={() =>
                movileNav === "hidden"
                  ? setMovileNav("block")
                  : setMovileNav("hidden")
              }
              className="mb-4 px-8 py-2 text-3xl font-semibold bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 "
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
}
