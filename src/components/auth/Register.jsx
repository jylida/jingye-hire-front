import { useReducer, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import AuthFormContainer from "./AuthContainer";
import RegisterForm from "./RegisterForm";

//Regex for validating username and password
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const registerInit = {
  username: {
    content: "",
    isValid: false,
    isFocused: false,
  },
  password: {
    content: "",
    isValid: false,
    isFocused: false,
  },
  match: {
    content: "",
    isMatch: false,
    isFocused: false,
  },
  errorMessage: "",
  isRegisterSuccess: false,
};

const actionType = {
  setUser: "setUser",
  setPassword: "setPassword",
  setMatch: "setMatch",
  setErrorMessage: "setErrorMessage",
  setIsRegisterSuccess: "setIsRegisterSuccess",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.setUser:
      return { ...state, username: action.payload };
    case actionType.setPassword:
      return { ...state, password: action.payload };
    case actionType.setMatch:
      return { ...state, match: action.payload };
    case actionType.setErrorMessage:
      return { ...state, errorMessage: action.payload };
    case actionType.setIsRegisterSuccess:
      return { ...state, isRegisterSuccess: action.payload };
    default:
      throw new Error("no action matched!");
  }
};

const Register = () => {
  const [state, dispatch] = useReducer(reducer, registerInit);

  useEffect(() => {
    dispatch({
      type: actionType.setUser,
      payload: {
        ...state.username,
        isValid: USER_REGEX.test(state.username.content),
      },
    });
  }, [state.username.content]);
  useEffect(() => {
    dispatch({
      type: actionType.setPassword,
      payload: {
        ...state.password,
        isValid: PWD_REGEX.test(state.password.content),
      },
    });
  }, [state.password.content]);
  useEffect(() => {
    dispatch({
      type: actionType.setMatch,
      payload: {
        ...state.match,
        isMatch:
          state.password.content === state.match.content &&
          state.password.content.length > 0,
      },
    });
  }, [state.password.content, state.match.content]);

  return (
    <main
      style={{
        overflow: "scroll",
        display: "flex",
        flowDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        minHeight: "100vh",
      }}
    >
      <AuthFormContainer>
        <Typography variant="h4" gutterBottom={true} fontWeight="bold" mt={0}>
          注册
        </Typography>
        {state.errorMessage && (
          <Typography variant="paragraph" color="error">
            {state.errorMessage}
          </Typography>
        )}
        <RegisterForm
          dispatch={dispatch}
          state={state}
          actionType={actionType}
        />
      </AuthFormContainer>
    </main>
  );
};

export default Register;
