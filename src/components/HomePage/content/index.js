import Stack from "@mui/material/Stack";
import MyCarousel from "./Carousel";
const HomePageContent = () => {
  return (
    <Stack direction="column" alignItems="center" width="100%" flexGrow={1}>
      <MyCarousel />
    </Stack>
  );
};

export default HomePageContent;
