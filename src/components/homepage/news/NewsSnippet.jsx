import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
const NewsSnippet = ({ news }) => {
  const theme = useTheme();
  const idMiddleDown = useMediaQuery(theme.breakpoints.down("sm"));
  const lengthLimit = idMiddleDown ? "70" : "140";
  return (
    <Box
      component={Link}
      to={`/hire/news/${news._id}`}
      sx={{
        padding: "0.5rem",
        // minHeight: "100px",
        display: "flex",
        flexDirection: "column",
        borderBottom: "1px solid lightgray",
        ":last-of-type": {
          borderBottom: "none",
        },
        textDecoration: "none",
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
        {`created:${news.createDate}\t`}
        {news.updateDate && `updated: ${news.updateDate}`}
      </Typography>
      <Typography variant="paragraph" sx={{ color: "gray" }}>
        {news.content.length < lengthLimit
          ? news.content
          : news.content.slice(0, lengthLimit) + "..."}
      </Typography>
    </Box>
  );
};

export default NewsSnippet;
