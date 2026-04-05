import { useSelector } from "react-redux";
import { selectToken } from "../features/authSlice";
import axios from "axios";

const useAxios = () => {
  const token = useSelector(selectToken);
  const baseURL = import.meta.env.VITE_BASE_URL;

  const axiosWithToken = axios.create({
    baseURL,
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  const axiosWithoutToken = axios.create({ baseURL });

  return { axiosWithToken, axiosWithoutToken };
};

export default useAxios;
