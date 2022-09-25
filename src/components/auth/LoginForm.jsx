import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "../../api/axios";

const LoginForm = ({ state, dispatch, actionType, setAuth }) => (
  <FormControl
    component={Stack}
    spacing={3}
    onSubmit={(e) => {
      e.preventDefault();
    }}
  >
    <TextField
      id="username"
      label="用户名"
      variant="outlined"
      value={state.username}
      onChange={(e) => {
        dispatch({
          type: actionType.setUser,
          payload: e.target.value,
        });
      }}
    />
    <TextField
      id="password"
      label="密码"
      type="password"
      variant="outlined"
      value={state.password}
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
      onClick={async () => {
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
          console.log(response.data);
          const accessToken = response?.data?.accessToken;
          const roles = response?.data?.roles;
          setAuth({
            username: state.username,
            password: state.password,
            roles,
            accessToken,
          });
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
      }}
    >
      登陆
    </Button>
  </FormControl>
);

export default LoginForm;
