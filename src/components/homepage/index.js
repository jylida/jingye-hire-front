import { useContext } from "react";
import HireInfoContext from "../../context/hireInfoProvider";
import { Outlet } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Header from "./Header";
import Footer from "./Footer";
import { getHireNewsPostsPage } from "../../api/axios";
import { useQuery } from "react-query";

const HomePage = () => {
  const { setFetched, setIsPreviousData, page, limit } =
    useContext(HireInfoContext);
  const {
    isLoading,
    isError,
    error,
    data: fetchedData,
    isPreviousData,
  } = useQuery(["/hirenews", page], () => getHireNewsPostsPage(page, limit), {
    keepPreviousData: true,
  });

  if (isLoading) return <h2>Is loading</h2>;
  if (isError) return <h2>{error.message}</h2>;
  setFetched(fetchedData);
  setIsPreviousData(isPreviousData);
  return (
    <Stack
      component="article"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Header />
      <Outlet />
      <Footer />
    </Stack>
  );
};

export default HomePage;
