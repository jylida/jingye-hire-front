import { createBrowserRouter } from "react-router-dom";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import FindBackKey from "../components/auth/FindBackKey";
// import RequireAuth from "../components/auth/RequireAuth";
import HomePage from "../components/homepage";

const routers = createBrowserRouter([
  {
    path: "hire",
    element: <HomePage />,
  },
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
  // {
  //   element: <RequireAuth />,
  //   children: {
  //     path: "/",
  //   },
  // },
]);

export default routers;
