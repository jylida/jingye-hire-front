import { createBrowserRouter } from "react-router-dom";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

const routers = createBrowserRouter([
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);

export default routers;
