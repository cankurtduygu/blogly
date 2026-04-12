import BreadCrumb from "./BreadCrumb";
import MyProfile from "./MyProfile";
import ProfileSideMenu from "./ProfileSideMenu";

export default function Profile() {
  return (
    <>
      <div className=" mt-8 max-w-7xl mx-auto px-4 ">
        <BreadCrumb />
        <div className="grid grid-cols-[auto_1fr] gap-6">
          <ProfileSideMenu />
          <MyProfile />
        </div>
      </div>
    </>
  );
}
