import { Link } from "react-router-dom";
import heroImg from "../../assets/heroimg.png";

export default function Hero() {
  return (
    <div>
      <main className="max-w-7xl mx-auto flex flex-col max-md:gap-20 md:flex-row pb-20 items-center justify-between px-4">
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-center md:text-left text-6xl leading-11.5 md:text-5xl md:leading-17 font-semibold max-w-xl text-slate-900">
            A place to
            <br />
            read, write, and grow.
          </h1>
          <p className="text-center md:text-left text-md text-slate-700 max-w-lg mt-8">
            Read and share articles on technology, life, and more.
          </p>
          <div className="flex items-center gap-4 mt-8 text-sm">
            <Link
              to="/sign-up"
              className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 transition rounded-md px-7 h-11"
            >
              Get started
            </Link>
            <button className="flex items-center gap-2 border border-slate-600 active:scale-95 hover:bg-white/10 transition text-slate-600 rounded-md px-6 h-11">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-video-icon lucide-video"
              >
                <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
                <rect x="2" y="6" width="14" height="12" rx="2" />
              </svg>
              <span>Watch demo</span>
            </button>
          </div>
        </div>
        <img
          src={heroImg}
          alt="hero"
          className="max-w-sm sm:max-w-md lg:max-w-lg 2xl:max-w-xl transition-all duration-300"
        />
      </main>
    </div>
  );
}
