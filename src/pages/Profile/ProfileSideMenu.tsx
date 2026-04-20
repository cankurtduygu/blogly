import {
  LuSquarePen,
  LuFileText,
  LuHeart,
  LuMessageCircle,
  LuLogOut,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import useAuthCall from "../../hooks/useAuthCall";

export default function ProfileSideMenu({
  setActiveMenu,
  activeMenu,
}: {
  activeMenu: string;
  setActiveMenu: (val: string) => void;
}) {
  const { signOut } = useAuthCall();
  const navigate = useNavigate();

  return (
    <div className="text-sm w-full md:w-56 p-4 bg-white border border-gray-300/30 text-gray-500 rounded-md font-medium">
      <ul className="flex flex-row md:flex-col gap-2 overflow-x-auto">
        <li
          className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded transition whitespace-nowrap ${activeMenu === "My Profile" ? "bg-slate-900 text-white" : "hover:bg-gray-300/40"}`}
          onClick={() => setActiveMenu("My Profile")}
        >
          <LuSquarePen size={18} />
          <span>My Profile</span>
        </li>
        <li
          className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded transition whitespace-nowrap ${activeMenu === "Blogs" ? "bg-slate-900 text-white" : "hover:bg-gray-300/40"}`}
          onClick={() => setActiveMenu("Blogs")}
        >
          <LuFileText size={18} />
          <span>My Blogs</span>
        </li>
        <li
          className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded transition whitespace-nowrap ${activeMenu === "Likes" ? "bg-slate-900 text-white" : "hover:bg-gray-300/40"}`}
          onClick={() => setActiveMenu("Likes")}
        >
          <LuHeart size={18} />
          <span>Likes</span>
        </li>
        <li
          className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded transition whitespace-nowrap ${activeMenu === "Comments" ? "bg-slate-900 text-white" : "hover:bg-gray-300/40"}`}
          onClick={() => setActiveMenu("Comments")}
        >
          <LuMessageCircle size={18} />
          <span>Comments</span>
        </li>
        <div className="hidden md:block w-full h-px bg-gray-300/50 my-2"></div>
        <li
          className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded hover:bg-gray-300/40 transition whitespace-nowrap"
          onClick={async () => {
            await signOut();
            navigate("/");
          }}
        >
          <LuLogOut size={18} />
          <span>Log Out</span>
        </li>
      </ul>
    </div>
  );
}
