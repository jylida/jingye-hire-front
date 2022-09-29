import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

const useWindowSize = (size) => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(size));
};

export default useWindowSize;
