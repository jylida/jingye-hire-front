import { useReducer, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { StyledAuthContainer } from "../styledComponents";
import AuthFormContainer from "./AuthContainer";
import LoginForm from "./LoginForm";

const loginInit = {
  username: "",
  password: "",
  errorMessage: "",
  isLoginSuccess: false,
};

const actionType = {
  setUser: "setUser",
  setPassword: "setPassword",
  setErrorMessage: "setErrorMessage",
  setIsLoginSuccess: "setIsLoginSuccess",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.setUser:
      return { ...state, username: action.payload };
    case actionType.setPassword:
      return { ...state, password: action.payload };
    case actionType.setErrorMessage:
      return { ...state, errorMessage: action.payload };
    case actionType.setIsLoginSuccess:
      return { ...state, isLoginSuccess: action.payload };
    default:
      throw new Error("no action matched");
  }
};

const Login = () => {
  const [state, dispatch] = useReducer(reducer, loginInit);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //   useEffect(dispatch({ type: actionType.setErrorMessage, payload: "" }), [
  //     state.username,
  //     state.password,
  //   ]);
  return (
    <StyledAuthContainer>
      {state.isLoginSuccess ? (
        <Typography variant="h2" fontWeight="bold">
          Login Successfully! Redirecting...
        </Typography>
      ) : (
        <AuthFormContainer>
          <Typography variant="h4" gutterBottom={true} fontWeight="bold" mt={0}>
            登陆
          </Typography>
          {state.errorMessage && (
            <Typography variant="paragraph" color="error">
              {state.errorMessage}
            </Typography>
          )}
          <LoginForm
            state={state}
            dispatch={dispatch}
            actionType={actionType}
          />
          <section
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body1" display="inline" gutterBottom>
              尚未注册?请
              {
                <Link
                  to="/register"
                  style={{ textDecoration: "none", fontWeight: "bold" }}
                >
                  注册
                </Link>
              }
            </Typography>
            <Typography variant="body1" display="inline" gutterBottom>
              忘记密码？
            </Typography>
          </section>
        </AuthFormContainer>
      )}
    </StyledAuthContainer>
  );
};

export default Login;
