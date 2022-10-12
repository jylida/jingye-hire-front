import { useContext } from "react";
import Container from "@mui/material/Container";
import { useQuery } from "react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ApplyReviewContext from "../../context/applyReviewProvider";
import { Outlet } from "react-router-dom";

const getApplicationForm = async (
  pageParam = 1,
  limitParam = 10,
  axiosPrivate
) => {
  const response = await axiosPrivate.get(
    `/apply?page=${pageParam}&limit=${limitParam}`
  );
  return response.data;
};
const ApplicationReview = () => {
  const { page, limit, setFetched } = useContext(ApplyReviewContext);
  const axiosPrivate = useAxiosPrivate();
  const {
    isLoading,
    isError,
    error,
    data: fetchedData,
    isPreviousData,
  } = useQuery(
    ["/apply", page],
    () => getApplicationForm(page, limit, axiosPrivate),
    {
      keepPreviousData: true,
    }
  );
  if (isLoading) return <h2>Is loading</h2>;
  if (isError) return <h2>{error.message}</h2>;
  setFetched(fetchedData);

  return (
    <Container
      maxWidth="md"
      sx={{
        padding: { xs: "1rem", sm: "2rem", md: "3rem" },
        minHeight: { xs: "600px", md: "800px" },
      }}
    >
      <Outlet />
    </Container>
  );
};
export default ApplicationReview;
