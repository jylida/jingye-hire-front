import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import JobList from "./JobLIst";
import NewsFeed from "./news/NewsFeed";

const Content = ({response, state, dispatch, actionType }) => {
  const departmentsName = "初中教学部,高中教学部,其他".split(",");

  const {
    isLoading,
    isError,
    error,
    data: fetchedData,
    isFetching,
    isPreviousData,
  } = response;
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
            {isFetching?  <h6>Is Fetching...</h6>: (
            <NewsFeed newsList={fetchedData.news} />
            )}
            <Pagination
              onChange={(event, value) => {
                dispatch({type: actionType.setPage, payload: value});
              }}
              count={fetchedData.totalPages}
              variant="outlined"
              color="primary"
              hideNextButton={state.hireNews.page === fetchedData.totalPages || isPreviousData}
              hidePrevButton={state.hireNews.page === 1 || isPreviousData}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default Content;
