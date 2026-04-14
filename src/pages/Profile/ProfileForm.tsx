import React, { useRef } from "react";
import { LuUser, LuMail, LuImage, LuAtSign } from "react-icons/lu";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/authSlice";
import useAuthCall from "../../hooks/useAuthCall";
import { toast } from "react-toastify";

export default function ProfileForm({
  isEditOpen,
  setIsEditOpen,
}: {
  isEditOpen: boolean;
  setIsEditOpen: (val: boolean) => void;
}) {
  const currentUser = useSelector(selectCurrentUser);
  const { updateUser } = useAuthCall();

  // console.log(isEditOpen);

  const formRef = useRef<HTMLFormElement>(null);

  const handleProfilUpdate = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userData = Object.fromEntries(formData) as Record<string, string>;
    try {
      await updateUser(userData);
      toast.success("Profile updated successfully");
      setIsEditOpen(false);
    } catch {
      toast.error("Failed to update profile");
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleProfilUpdate}
      className="w-full mt-6 bg-white rounded-2xl border border-gray-200 p-8"
    >
      {/* Full Name, Email, Password & Image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            First Name
          </label>
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3">
            <LuUser className="text-gray-400 shrink-0" size={18} />
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              defaultValue={currentUser?.firstName}
              disabled={!isEditOpen}
              className="w-full outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Last Name
          </label>
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3">
            <LuUser className="text-gray-400 shrink-0" size={18} />
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              defaultValue={currentUser?.lastName}
              disabled={!isEditOpen}
              className="w-full outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Username
          </label>
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3">
            <LuAtSign className="text-gray-400 shrink-0" size={18} />
            <input
              name="username"
              type="text"
              placeholder="Username"
              defaultValue={currentUser?.username}
              disabled={!isEditOpen}
              className="w-full outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Email Address
          </label>
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3">
            <LuMail className="text-gray-400 shrink-0" size={18} />
            <input
              name="email"
              type="email"
              placeholder="Email"
              defaultValue={currentUser?.email}
              disabled={!isEditOpen}
              className="w-full outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="mt-6">
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Image
        </label>
        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3">
          <LuImage className="text-gray-400 shrink-0" size={18} />
          <input
            name="image"
            type="url"
            placeholder="Image URL"
            defaultValue={currentUser?.image}
            disabled={!isEditOpen}
            className="w-full outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          type="button"
          className="px-6 py-2.5 text-sm font-medium text-gray-700 cursor-pointer"
          onClick={() => {
            formRef.current?.reset();
            setIsEditOpen(false);
            toast.info("Changes cancelled");
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-full cursor-pointer hover:bg-gray-800 transition"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
