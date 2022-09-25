import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import NewsSnippet from "./NewsSnippet";

const NewsFeed = ({
  newsList = Array(10).fill({
    title: "title",
    date: new Date().toISOString(),
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero amet velit, eaque consequatur assumenda repudiandae omnis laudantium modi libero earum quae molestiae totam excepturi. Nemo molestiae dolore minus facere deserunt dolor similique velit doloremque temporibus esse asperiores corrupti, labore totam, cupiditate neque. Autem adipisci numquam ipsum ea nostrum nobis asperiores",
  }),
}) => {
  return (
    <Stack direction="column">
      <Typography variant="h5" mb={2} fontWeight="bold">
        最新职位信息
      </Typography>
      <Box
        component={Paper}
        sx={{
          height: { xs: "75vw", sm: "65vh" },
          marginBottom: "1rem",
          overflow: "scroll",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: {
            xs: "1rem",
            md: "2rem",
          },
        }}
      >
        {newsList.length > 0 ? (
          newsList.map((news, i) => (
            <NewsSnippet news={news} key={"newsFeed-" + i} />
          ))
        ) : (
          <h1>There is nothing to show</h1>
        )}
      </Box>
    </Stack>
  );
};

export default NewsFeed;
