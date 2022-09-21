import { createBrowserRouter } from "react-router-dom";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import FindBackKey from "../components/auth/FindBackKey";

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
]);

export default routers;
