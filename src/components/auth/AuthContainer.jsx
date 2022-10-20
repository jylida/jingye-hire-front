import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
const AuthFormContainer = ({ children }) => (
  <Stack
    component={Paper}
    variant="outlined"
    direction="column"
    alignContent="flex-start"
    justifyContent="center"
    spacing={4}
    sx={{
      paddingY: "2.5rem",
      paddingX: { xs: "1.2rem", md: "2.5rem" },
      width: "100vw",
      maxWidth: "480px",
      minHeight: "750px",
      maxHeight: "900px",
    }}
  >
    {children}
  </Stack>
);
export default AuthFormContainer;
