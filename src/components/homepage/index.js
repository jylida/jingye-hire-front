import Stack from "@mui/material/Stack";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";

const HomePage = () => {
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
      <Content />
      <Footer />
    </Stack>
  );
};

export default HomePage;
