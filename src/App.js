import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import FindBackKey from "./components/auth/FindBackKey";
import RequireAuth from "./components/auth/RequireAuth";
import HomePage from "./components/homepage/index";
import HomePageContent from "./components/homepage/Content";
import PostPage from "./components/homepage/PostPage";
import ApplyForm from "./components/applicationForm";
import { HireInfoProvider } from "./context/hireInfoProvider";
import ApplicationReview from "./components/applicationReview";
import { ApplyReviewProvider } from "./context/applyReviewProvider";
import ApplicationList from "./components/applicationReview/ApplicationList";
import ApplicationPost from "./components/applicationReview/ApplicationPost";

function App() {
  const ROLES_LIST = {
    Admin: 5150,
    Editor: 1984,
    User: 2001,
  };

  const routers = createBrowserRouter([
    {
      path: "hire",
      element: (
        <HireInfoProvider>
          <HomePage />
        </HireInfoProvider>
      ),
      children: [
        {
          path: "",
          element: <HomePageContent />,
        },
        {
          path: "news/:id",
          element: <PostPage />,
        },
      ],
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
              element: <ApplicationList />,
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
