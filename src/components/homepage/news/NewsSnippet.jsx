import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
const NewsSnippet = ({ news }) => {
  const theme = useTheme();
  const idMiddleDown = useMediaQuery(theme.breakpoints.down("sm"));
  const lengthLimit = idMiddleDown ? "70" : "140";
  return (
    <Box
      component="section"
      sx={{
        padding: "0.5rem",
        // minHeight: "100px",
        display: "flex",
        flexDirection: "column",
        borderBottom: "1px solid lightgray",
        ":last-of-type": {
          borderBottom: "none",
        },
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        {news.title}
      </Typography>
      <Typography
        variant="caption"
        fontWeight="light"
        sx={{ color: "lightgrey" }}
      >
        {news.date}
      </Typography>
      <Typography variant="paragraph" sx={{ color: "gray" }}>
        {news.body.length < lengthLimit
          ? news.body
          : news.body.slice(0, lengthLimit) + "..."}
      </Typography>
    </Box>
  );
};

export default NewsSnippet;
