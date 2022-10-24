import Carousel from "react-material-ui-carousel";
import Box from "@mui/material/Box";
import image1 from "../../../static/image/homepage/image1.jpg";
import image2 from "../../../static/image/homepage/image2.jpg";
import image3 from "../../../static/image/homepage/image3.jpg";

const ImageFrame = ({ image }) => {
  return (
    <Box
      component="img"
      src={image.src}
      alt={image.alt}
      height={{ xs: "300px", md: "500px" }}
      width="100%"
      sx={{
        objectFit: "cover",
      }}
    />
  );
};

const MyCarousel = () => {
  const imageObjs = [
    { src: image1, alt: "image1" },
    { src: image2, alt: "image2" },
    { src: image3, alt: "image3" },
  ];
  return (
    <Carousel sx={{ width: "100%" }}>
      {imageObjs.map((obj, i) => (
        <ImageFrame image={obj} />
      ))}
    </Carousel>
  );
};

export default MyCarousel;
