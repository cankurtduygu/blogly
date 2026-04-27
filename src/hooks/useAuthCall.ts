import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  cleanAuth,
  selectCurrentUser,
  updateUserInfo,
  updateProfile,
} from "../store/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAxios from "./useAxios";
import type { SignInFormData, SignUpCredentials } from "../lib/schemas";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { axiosWithToken } = useAxios();
  const currentUser = useSelector(selectCurrentUser);

  const signIn = async (userCredentials: SignInFormData) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}auth/login`,
        userCredentials,
      );
      console.log(data);
      navigate("/");
      dispatch(updateUserInfo(data));

      toast.success("Login successful");
    } catch (error) {
      toast.error("Login failed");
      // console.log("error:", error);
    }
  };

  const signUp = async (userCredentials: SignUpCredentials) => {
    const { data } = await axios.post(`${BASE_URL}users`, userCredentials);
    dispatch(updateUserInfo(data));
    return data;
  };

  const signOut = async () => {
    await new Promise((res) => setTimeout(res, 2000));

    try {
      await axiosWithToken(`auth/logout`);

      dispatch(cleanAuth());
      navigate("/");
    } catch (error) {
      const err = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      toast.error(
        err.response?.data?.message || err.message || "Logout Failed",
      );
    }
  };

  const updateUser = async (userData: Record<string, string>) => {
    const { data } = await axiosWithToken.put(
      `users/${currentUser?._id}`,
      userData,
    );
    dispatch(updateProfile(data.new));
    return data;
  };

  return { signIn, signUp, signOut, updateUser };
};

export default useAuthCall;
