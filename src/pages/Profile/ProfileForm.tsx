import { LuUser, LuMail, LuPhone } from "react-icons/lu";

export default function ProfileForm() {
  return (
    <div className="w-full mt-6 bg-white rounded-2xl border border-gray-200 p-8">
      {/* Full Name & Email */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Full Name
          </label>
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3">
            <LuUser className="text-gray-400 shrink-0" size={18} />
            <input
              type="text"
              placeholder="Jane Doe"
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
              type="email"
              placeholder="jane@example.com"
              className="w-full outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Phone Number */}
      <div className="mt-6 w-1/2 pr-3">
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Phone Number
        </label>
        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3">
          <LuPhone className="text-gray-400 shrink-0" size={18} />
          <input
            type="tel"
            placeholder="+1 (555) 123-4567"
            className="w-full outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
          />
        </div>
      </div>

      {/* Divider */}
      <hr className="my-8 border-gray-200" />

      {/* Newsletter */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Newsletter Preferences
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Receive updates on new arrivals and offers.
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-300 peer-checked:bg-gray-900 rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] peer-checked:after:translate-x-full after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button className="px-6 py-2.5 text-sm font-medium text-gray-700 cursor-pointer">
          Cancel
        </button>
        <button className="px-6 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-full cursor-pointer hover:bg-gray-800 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
}
