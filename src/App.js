import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import FindBackKey from "./components/auth/FindBackKey";
import RequireAuth from "./components/auth/RequireAuth";
import HomePage from "./components/HomePage";
import ApplyForm from "./components/applicationForm";
import ApplicationReview from "./components/applicationReview";
import { ApplyReviewProvider } from "./context/applyReviewProvider";
import ApplicationPost from "./components/applicationReview/ApplicationPost";
import ApplicationListFeed from "./components/applicationReview/applicationList/ApplicationListFeed";
import ErrorPage from "./components/error-page";
import HomePageContent from "./components/HomePage/content";
import Introduction from "./components/HomePage/Introduction";
import HireFrontPage from "./components/HomePage/hireFrontPage";

function App() {
  const ROLES_LIST = {
    Admin: 5150,
    Editor: 1984,
    User: 2001,
  };

  const routers = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      children: [
        {
          path: "/",
          element: <HomePageContent />,
        },
        {
          path: "intro",
          element: <Introduction />,
        },
        {
          path: "hire",
          element: <HireFrontPage />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <ErrorPage />,
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
      element: <RequireAuth allowedRoles={[ROLES_LIST.User]} />,
      children: [
        {
          path: "apply",
          element: <ApplyForm />,
        },
      ],
    },
    {
      element: (
        <RequireAuth allowedRoles={[ROLES_LIST.Editor, ROLES_LIST.Admin]} />
      ),
      children: [
        {
          path: "review",
          element: (
            <ApplyReviewProvider>
              <ApplicationReview />
            </ApplyReviewProvider>
          ),
          children: [
            {
              path: "",
              element: <ApplicationListFeed />,
            },
            {
              path: ":id",
              element: <ApplicationPost />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={routers} />;
}

export default App;
