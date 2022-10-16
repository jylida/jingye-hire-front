import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return {
        ...prev,
        accessToken: response.data.accessToken,
        roles: response.data.roles,
        progress: response.data.progress,
      };
    });
    return response.data;
  };

  return refresh;
};

export default useRefreshToken;
