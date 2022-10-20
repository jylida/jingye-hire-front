import { useContext } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Check from "@mui/icons-material/Check";
import Stack from "@mui/material/Stack";
import axios from "../../api/axios";
import Captcha from "./captcha";
import AuthContext from "../../context/authProvider";

const CheckLabel = (condition) => ({
  endAdornment: (
    <InputAdornment position="end">
      {condition && <Check color="secondary" />}
    </InputAdornment>
  ),
});

const RegisterForm = ({ state, dispatch, actionType }) => {
  const { captchaMatch, setCaptchaMatch } = useContext(AuthContext);
  return (
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
        value={state.username.content.toLowerCase()}
        onChange={(e) => {
          dispatch({
            type: actionType.setUser,
            payload: {
              ...state.username,
              content: e.target.value.toLowerCase(),
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
      <Captcha state={state} />
      <Button
        disabled={
          !(
            state.username.isValid &&
            state.password.isValid &&
            state.match.isMatch &&
            captchaMatch
          )
        }
        variant="contained"
        sx={{
          paddingY: "1rem",
        }}
        onClick={async () => {
          try {
            const response = await axios.post(
              "/register",
              JSON.stringify({
                user: state.username.content,
                pwd: state.password.content,
              }),
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );
            console.log(response.data);
            dispatch({ type: actionType.setIsRegisterSuccess, payload: true });
            localStorage.clear("authStored");
          } catch (err) {
            setCaptchaMatch(false);
            if (!err.response) {
              dispatch({
                type: actionType.setErrorMessage,
                payload: "No Internet response",
              });
            } else if (err.response?.status === 409) {
              dispatch({
                type: actionType.setErrorMessage,
                payload: `username ${state.username.content} has been taken`,
              });
            } else {
              dispatch({
                type: actionType.setErrorMessage,
                payload: "registration failed!",
              });
            }
          }
        }}
      >
        注册
      </Button>
    </FormControl>
  );
};

export default RegisterForm;
