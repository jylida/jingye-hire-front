import { createBrowserRouter } from "react-router-dom";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import FindBackKey from "../components/auth/FindBackKey";
import RequireAuth from "../components/auth/RequireAuth";

const routers = createBrowserRouter([
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "findbackkey",
    element: <FindBackKey />,
  },
  {
    element: <RequireAuth />,
    children: {
      path: "/",
    },
  },
]);

export default routers;
