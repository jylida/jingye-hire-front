import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "../../api/axios";

const LoginForm = ({ state, dispatch, actionType, setAuth }) => {
  const navigate = useNavigate();
  const ROLES_LIST = {
    Admin: 5150,
    Editor: 1984,
    User: 2001,
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "auth",
        JSON.stringify({
          user: state.username,
          pwd: state.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      const progress = response?.data?.progress;
      setAuth({
        username: state.username,
        roles,
        accessToken,
        progress,
      });
      localStorage.setItem(
        "auth",
        JSON.stringify({
          username: state.username,
          roles,
          accessToken,
          progress,
        })
      );
      dispatch({ type: actionType.setIsLoginSuccess, payload: true });
      dispatch({ type: actionType.setErrorMessage, payload: "" });
      console.log("login successfully");
      if (
        roles.includes(ROLES_LIST.Admin) ||
        roles.includes(ROLES_LIST.Editor)
      ) {
        navigate("/review");
      } else {
        navigate("/apply");
      }
    } catch (err) {
      if (!err.message) {
        dispatch({
          type: actionType.setErrorMessage,
          payload: "No internet response",
        });
      } else if (err?.response?.status === 400) {
        dispatch({
          type: actionType.setErrorMessage,
          payload: "Missing username or password",
        });
      } else if (err?.response?.status === 401) {
        dispatch({
          type: actionType.setErrorMessage,
          payload: "unauthorized!",
        });
      } else {
        dispatch({
          type: actionType.setErrorMessage,
          payload: "Login Failed",
        });
      }
    }
  };
  return (
    <FormControl component={Stack} spacing={3}>
      <TextField
        id="username"
        label="?????????"
        variant="outlined"
        value={state.username}
        onChange={(e) => {
          dispatch({
            type: actionType.setUser,
            payload: e.target.value.toLowerCase(),
          });
        }}
      />
      <TextField
        id="password"
        label="??????"
        type="password"
        variant="outlined"
        value={state.password}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLogin(e);
          }
        }}
        onChange={(e) => {
          dispatch({
            type: actionType.setPassword,
            payload: e.target.value,
          });
        }}
      />
      <Button
        variant="contained"
        sx={{
          paddingY: "1rem",
        }}
        onClick={handleLogin}
      >
        ??????
      </Button>
    </FormControl>
  );
};

export default LoginForm;
