import {
  LuSquarePen,
  LuFileText,
  LuHeart,
  LuMessageCircle,
  LuLogOut,
} from "react-icons/lu";

export default function ProfileSideMenu() {
  return (
    <div className="text-sm w-56 p-4 bg-white border border-gray-300/30 text-gray-500 rounded-md font-medium">
      <ul className="flex flex-col gap-2">
        <li className="flex items-center gap-2 bg-blue-600 text-white cursor-pointer px-3 py-2 rounded">
          <LuSquarePen size={18} />
          <a href="#">Profile</a>
        </li>
        <li className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-300/40 transition">
          <LuFileText size={18} />
          <a href="#">My Blogs</a>
        </li>
        <li className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-300/40 transition">
          <LuHeart size={18} />
          <a href="#">Likes</a>
        </li>
        <li className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-300/40 transition">
          <LuMessageCircle size={18} />
          <a href="#">Comments</a>
        </li>
        <div className="w-full h-px bg-gray-300/50 my-2"></div>
        <li className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-300/40 transition">
          <LuLogOut size={18} />
          <a href="#">Log Out</a>
        </li>
      </ul>
    </div>
  );
}
