import { useState } from "react";
import BreadCrumb from "./BreadCrumb";
import MyProfile from "./MyProfile";
import ProfileSideMenu from "./ProfileSideMenu";
import MyBlogs from "./MyBlogs";
import Likes from "./Likes";
import Comments from "./Comments";

export default function Profile() {
  const [activeMenu, setActiveMenu] = useState("My Profile");
  return (
    <>
      <div className=" mt-8 max-w-7xl mx-auto px-4 ">
        <BreadCrumb activeMenu={activeMenu} />
        <div className="flex flex-col md:grid md:grid-cols-[auto_1fr] gap-6 items-start">
          <ProfileSideMenu
            setActiveMenu={setActiveMenu}
            activeMenu={activeMenu}
          />
          <div className="w-full min-w-0">
            {activeMenu === "My Profile" && <MyProfile />}
            {activeMenu === "Blogs" && <MyBlogs />}
            {activeMenu === "Likes" && <Likes />}
            {activeMenu === "Comments" && <Comments />}
          </div>
        </div>
      </div>
    </>
  );
}
