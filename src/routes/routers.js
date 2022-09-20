import { createBrowserRouter } from "react-router-dom";
import Register from "../components/auth/Register";

const routers = createBrowserRouter([
  {
    path: "register",
    element: <Register />,
  },
]);

export default routers;
