import { createContext, useState } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [captchaMatch, setCaptchaMatch] = useState(false);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, captchaMatch, setCaptchaMatch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
