import UserProfileCard from "./UserProfileCard";
import ProfileForm from "./ProfileForm";

export default function () {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Personal Information</h1>
      <p className="text-gray-500 text-sm mt-1 mb-6">
        Manage your details and preferences here.
      </p>
      <UserProfileCard />
      <ProfileForm />
    </div>
  );
}
