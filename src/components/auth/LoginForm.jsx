import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const LoginForm = ({ state, dispatch, actionType }) => (
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
    >
      登陆
    </Button>
  </FormControl>
);

export default LoginForm;
