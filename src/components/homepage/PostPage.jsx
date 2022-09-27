import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import HireInfoContext from "../../context/hireInfoProvider";

const PostPage = () => {
  const { fetched } = useContext(HireInfoContext);
  const { id } = useParams();
  if (!fetched.news) return <h2>Loading...</h2>;
  const post = fetched.news.find((nw) => nw._id.toString() === id);
  return post ? (
    <Container
      maxWidth="md"
      component={Paper}
      variant="outlined"
      sx={{
        height: "100%",
        flewGrow: 1,
        minHeight: "500px",
        overflow: "scroll",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: "1rem",
        padding: {
          xs: "1rem",
          md: "3rem",
        },
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        {post.title}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: "lightgrey",
          marginBottom: {
            xs: "1rem",
            sm: "2rem",
          },
          display: "block",
        }}
      >
        {`发布于: ${post.createDate}\t${
          post.updateDate ? `最新修改于:${post.updateDate}` : ""
        }`}
      </Typography>
      <Typography
        variant="paragraph"
        sx={{
          display: "block",
          marginBottom: "1rem",
        }}
      >
        {post.content}
      </Typography>

      <Link to="/hire" style={{ textDecoration: "none", fontSize: 14 }}>
        <ArrowBack sx={{ fontSize: "small" }} />
        返回招聘首页
      </Link>
    </Container>
  ) : (
    <h1>No post found</h1>
  );
};
export default PostPage;
