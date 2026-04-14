import UserProfileCard from "./UserProfileCard";
import ProfileForm from "./ProfileForm";
import { useState } from "react";

export default function MyProfile () {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Personal Information
          </h1>
          <p className="text-gray-500 text-sm mt-1 mb-6">
            Manage your details and preferences here.
          </p>
        </div>
        {!isEditOpen && (
          <button
            className="px-5 py-2.5 text-sm font-medium text-gray-900 border border-gray-300 rounded-xl hover:bg-gray-50 transition cursor-pointer"
            onClick={() => setIsEditOpen((prev) => !prev)}
          >
            Edit Profile
          </button>
        )}
      </div>
      <UserProfileCard />
      <ProfileForm isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen} />
    </div>
  );
}
