import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Check from "@mui/icons-material/Check";
import Stack from "@mui/material/Stack";

const CheckLabel = (condition) => ({
  endAdornment: (
    <InputAdornment position="end">
      {condition && <Check color="secondary" />}
    </InputAdornment>
  ),
});

const RegisterForm = ({ state, dispatch, actionType }) => (
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
      error={!state.username.isValid && state.username.content > 0}
      helperText="英文字母起头,长度4到23,可包含英文字母、数字以及下划线"
      InputProps={CheckLabel(state.username.isValid)}
      value={state.username.content}
      onChange={(e) => {
        dispatch({
          type: actionType.setUser,
          payload: {
            ...state.username,
            content: e.target.value,
          },
        });
      }}
      onFocus={() => {
        dispatch({
          type: actionType.setUser,
          payload: { ...state.username, isFocused: true },
        });
      }}
      onBlur={() => {
        dispatch({
          type: actionType.setUser,
          payload: { ...state.username, isFocused: false },
        });
      }}
    />
    <TextField
      id="password"
      label="密码"
      type="password"
      InputProps={CheckLabel(state.password.isValid)}
      variant="outlined"
      value={state.password.content}
      error={!state.password.isValid && state.password.content.length > 0}
      helperText="长度9到24，须同时包括大、小写英文字母、阿拉伯数字以及五个特殊字符!@#$%中的至少一个"
      onChange={(e) => {
        dispatch({
          type: actionType.setPassword,
          payload: {
            ...state.password,
            content: e.target.value,
          },
        });
      }}
      onFocus={() => {
        dispatch({
          type: actionType.setPassword,
          payload: { ...state.password, isFocused: true },
        });
      }}
      onBlur={() => {
        dispatch({
          type: actionType.setPassword,
          payload: { ...state.password, isFocused: false },
        });
      }}
    />
    <TextField
      id="re-enter"
      label="再次输入密码"
      variant="outlined"
      type="password"
      error={!state.match.isMatch && state.password.isValid}
      InputProps={CheckLabel(state.match.isMatch)}
      onChange={(e) => {
        dispatch({
          type: actionType.setMatch,
          payload: {
            ...state.match,
            content: e.target.value,
          },
        });
      }}
      onFocus={() => {
        dispatch({
          type: actionType.setMatch,
          payload: { ...state.match, isFocused: true },
        });
      }}
      onBlur={() => {
        dispatch({
          type: actionType.setMatch,
          payload: { ...state.match, isFocused: false },
        });
      }}
    />
    <Button
      disabled={
        !(
          state.username.isValid &&
          state.password.isValid &&
          state.match.isMatch
        )
      }
      variant="contained"
      sx={{
        paddingY: "1rem",
      }}
    >
      注册
    </Button>
  </FormControl>
);

export default RegisterForm;
