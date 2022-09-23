import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import JobList from "./JobLIst";
import NewsFeed from "./news/NewsFeed";

const Content = () => {
  const departmentsName = "初中教学部,高中教学部,其他".split(",");
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
            <NewsFeed />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default Content;
