import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signUpSchema } from "../lib/schemas";
import type z from "zod";
import useAuthCall from "../hooks/useAuthCall";
import { toast } from "react-toastify";

export default function SignUpForm() {
  type SignUpFormData = z.infer<typeof signUpSchema>;
  const { signUp } = useAuthCall();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      firstName: "",
      lastName: "",
    },
  });

  async function onSubmit(userCredentials: SignUpFormData) {
    const { confirmPassword, ...credentials } = userCredentials;
    try {
      await signUp(credentials);
      toast.success("Sign up successful");
      navigate("/");
    } catch {
      toast.error("Sign up failed");
    }
  }

  return (
    <div className="flex h-screen w-full">
      <div className="w-full hidden md:inline-block">
        <img
          className="h-full object-cover"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="leftSideImage"
        />
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-md w-full max-w-sm flex flex-col items-center justify-center px-4 md:px-0"
        >
          <h2 className="text-4xl text-slate-900 font-medium">
            Create an account
          </h2>
          <p className="text-sm text-slate-500 mt-3">
            Welcome! Please sign up to continue
          </p>

          <button
            type="button"
            className="w-full mt-8 bg-slate-100 flex items-center justify-center h-12 rounded-full hover:bg-slate-200 transition-colors"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="googleLogo"
            />
          </button>

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-slate-300"></div>
            <p className="w-full text-nowrap text-sm text-slate-500">
              or sign up with email
            </p>
            <div className="w-full h-px bg-slate-300"></div>
          </div>

          {/* First Name & Last Name */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex flex-col w-full gap-1">
              <label className="text-sm font-semibold text-slate-700">
                First Name
              </label>
              <div className="flex items-center w-full border border-slate-300 h-12 rounded-lg overflow-hidden pl-4 gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  type="text"
                  placeholder="John"
                  className="bg-transparent text-slate-700 placeholder-slate-400 outline-none text-sm w-full h-full"
                  {...register("firstName")}
                  disabled={isSubmitting}
                />
              </div>
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full gap-1">
              <label className="text-sm font-semibold text-slate-700">
                Last Name
              </label>
              <div className="flex items-center w-full border border-slate-300 h-12 rounded-lg overflow-hidden pl-4 gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  type="text"
                  placeholder="Doe"
                  className="bg-transparent text-slate-700 placeholder-slate-400 outline-none text-sm w-full h-full"
                  {...register("lastName")}
                  disabled={isSubmitting}
                />
              </div>
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Username */}
          <div className="flex flex-col w-full gap-1 mt-4">
            <label className="text-sm font-semibold text-slate-700">
              Username
            </label>
            <div className="flex items-center w-full border border-slate-300 h-12 rounded-lg overflow-hidden pl-4 gap-2">
              <span className="text-slate-400 text-sm font-medium">@</span>
              <input
                type="text"
                placeholder="johndoe"
                className="bg-transparent text-slate-700 placeholder-slate-400 outline-none text-sm w-full h-full"
                {...register("username")}
                disabled={isSubmitting}
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col w-full gap-1 mt-4">
            <label className="text-sm font-semibold text-slate-700">
              Email address
            </label>
            <div className="flex items-center w-full border border-slate-300 h-12 rounded-lg overflow-hidden pl-4 gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <input
                type="email"
                placeholder="you@example.com"
                className="bg-transparent text-slate-700 placeholder-slate-400 outline-none text-sm w-full h-full"
                {...register("email")}
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password & Confirm Password */}
          <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
            <div className="flex flex-col w-full gap-1">
              <label className="text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="flex items-center w-full border border-slate-300 h-12 rounded-lg overflow-hidden pl-4 pr-3 gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type="password"
                  placeholder="Min 8 characters"
                  className="bg-transparent text-slate-700 placeholder-slate-400 outline-none text-sm w-full h-full"
                  {...register("password")}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-600 shrink-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full gap-1">
              <label className="text-sm font-semibold text-slate-700">
                Confirm Password
              </label>
              <div className="flex items-center w-full border border-slate-300 h-12 rounded-lg overflow-hidden pl-4 pr-3 gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type="password"
                  placeholder="Repeat password"
                  className="bg-transparent text-slate-700 placeholder-slate-400 outline-none text-sm w-full h-full"
                  {...register("confirmPassword")}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-600 shrink-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 w-full h-11 rounded-full text-white bg-slate-900 hover:bg-slate-800 transition-colors"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="loading loading-spinner loading-xs" />
                Creating account...
              </span>
            ) : (
              "Create account"
            )}
          </button>
          <p className="text-slate-500 text-sm mt-4">
            Already have an account?{" "}
            <Link className="text-slate-700 hover:underline" to="/sign-in">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
