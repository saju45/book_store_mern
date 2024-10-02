import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="h-screen  md:h-[75vh] flex flex-col md:flex-row items-center justify-center">
      <div className="w-full mt-31 md:mt-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-start">
          Discover Your Next Great Read
        </h1>
        <p className="mt-4 text-lg text-zinc-300">
          Uncover Captiviting, stories, enriching , knowledge, and enless
          inspiration in our corated colllection of books
        </p>
        <div className="mt-8">
          <Link
            to="/all-books"
            className="text-yellow-100 text-lg lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800  rounded-full text-center lg:text-left"
          >
            Dicover Books
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center">
        <img src="/image.png" alt="hero" />
      </div>
    </div>
  );
}
