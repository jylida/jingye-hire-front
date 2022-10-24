import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
const Paragraph = (props) => {
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down("md"));
  const { children, ...others } = props;
  console.log(others);
  return (
    <Typography
      variant={isSM ? "body2" : "body1"}
      paragraph
      color={others.color || "text.secondary"}
    >
      {children}
    </Typography>
  );
};

export default Paragraph;
