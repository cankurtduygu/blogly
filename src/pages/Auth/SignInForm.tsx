import { Link } from "react-router-dom";
import type z from "zod";
import { signInSchema } from "../../lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthCall from "../../hooks/useAuthCall";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";

export default function SignInForm() {
  type SignInFormData = z.infer<typeof signInSchema>;
  const { signIn, googleLogin } = useAuthCall();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(userCredentials: SignInFormData) {
    await signIn(userCredentials);
  }

  return (
    <div className="bg-white text-gray-500 w-full max-w-md mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Welcome back
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <input
          id="email"
          className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          disabled={isSubmitting}
        />
        <p className="text-red-500 text-xs mt-1 min-h-4">
          {errors.email?.message}
        </p>
        <input
          id="password"
          className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          disabled={isSubmitting}
        />
        <p className="text-red-500 text-xs mt-1 min-h-4">
          {errors.password?.message}
        </p>
        <div className="text-right py-4">
          <a className="text-blue-600 underline" href="#">
            Forgot Password
          </a>
        </div>
        <button
          type="submit"
          className="w-full mb-3 bg-slate-900 py-2.5 rounded-full text-white"
        >
          Log in
        </button>
      </form>
      <p className="text-center mt-4">
        Don't have an account?{" "}
        <Link to="/sign-up" className="text-blue-500 underline">
          Signup
        </Link>
      </p>
      <div className="flex justify-center my-3">
        <GoogleLogin
          onSuccess={(res) => {
            if (res.credential) googleLogin(res.credential);
          }}
          onError={() => toast.error("Google login failed")}
          theme="outline"
          size="large"
          text="signin_with"
          width="384"
        />
      </div>
    </div>
  );
}
