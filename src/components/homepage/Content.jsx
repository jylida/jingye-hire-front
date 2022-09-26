import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import { useQuery } from "react-query";
import JobList from "./JobLIst";
import NewsFeed from "./news/NewsFeed";
import axios, { getHireNewsPostsPage } from "../../api/axios";

const Content = () => {
  const departmentsName = "初中教学部,高中教学部,其他".split(",");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const {
    isLoading,
    isError,
    error,
    data: fetchedData,
    isFetching,
    isPreviousData,
  } = useQuery("/hirenews", () => getHireNewsPostsPage(page, limit), {
    keepPreviousData: true,
  });
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>{error.message}</h1>;
  console.log(fetchedData);
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        padding: { xs: "1rem", md: "2rem" },
        overflow: "scroll",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 2, md: 6 }}
          sx={{
            width: "100%",
          }}
        >
          <Grid item xs={12} md={4}>
            <JobList departmentsName={departmentsName} />
          </Grid>
          <Grid item xs={12} md={8}>
            <NewsFeed newsList={fetchedData.news} />
            <Pagination
              onChange={(event, value) => {
                setPage(value);
              }}
              count={fetchedData.totalPages}
              variant="outlined"
              color="primary"
              hideNextButton={page === fetchedData.totalPages || isPreviousData}
              hidePrevButton={page === 1 || isPreviousData}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default Content;
