import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    console.log("refreshed:", response);
    setAuth((prev) => {
      return { ...prev, accessToken: response.data };
    });
    return response.data;
  };

  return refresh;
};

export default useRefreshToken;
