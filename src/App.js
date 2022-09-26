import {  useReducer } from "react";
import { RouterProvider } from "react-router-dom";
import { useQuery } from "react-query";
import { getHireNewsPostsPage } from "./api/axios";
import { createBrowserRouter } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import FindBackKey from "./components/auth/FindBackKey";
// import RequireAuth from "../components/auth/RequireAuth";
import HomePage from "./components/homepage/index";
import HomePageContent from "./components/homepage/HomepageContent";
import PostPage from "./components/homepage/PostPage";

const init = {
  hireNews: {
    page: 1,
    limit: 5,
  }
};
const actionType = {
  setPage: "setPage",
  setLimit: "setLimit",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.setPage: return {...state, hireNews: {...state.hireNews, page: action.payload}} ;
    case actionType.setLimit: return {...state, hireNews: {...state.hireNews, limit: action.payload}};
    default: throw new Error ("no action type matches the request!");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, init);

  const response = useQuery(
    "/hirenews",
    () => getHireNewsPostsPage(state.hireNews.page, state.hireNews.limit),
    {
      keepPreviousData: true,
    }
  );
  if (response.isLoading) return (<h1>Is loading...</h1>);
  if (response.isError) return (<h1>Error: {response.error.message}</h1>);
  const {data: news} = response;
  const routers = createBrowserRouter([
    {
      path: "hire",
      element: <HomePage />,
      children: [
        {
          path: "",
          element: (
            <HomePageContent
              response={response}
              state={state}
              dispatch={dispatch}
              actionType={actionType}
            />
          ),
        },
        {
          path: "news/:id",
          element: <PostPage news={news}/>,
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
    // {
    //   element: <RequireAuth />,
    //   children: {
    //     path: "/",
    //   },
    // },
  ]);
  return <RouterProvider router={routers} />;
}

export default App;
