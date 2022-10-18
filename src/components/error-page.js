import { useRouteError } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
const ErrorPage = () => {
  const error = useRouteError();
  return (
    <Stack
      direction="column"
      spacing={{ xs: 1, md: 3 }}
      sx={{
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h1" color="error" fontWeight="bold">
        404
      </Typography>
      <Typography variant="paragraph" color="text.secondary">
        抱歉您来到了未知的荒原
      </Typography>
      <Typography variant="paragraph">
        {error.statusText || error.message}
      </Typography>
    </Stack>
  );
};

export default ErrorPage;
