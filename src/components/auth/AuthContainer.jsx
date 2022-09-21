import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { Divider } from "@mui/material";
const AuthFormContainer = ({ children }) => (
  <Stack
    component={Paper}
    variant="outlined"
    direction="column"
    alignContent="flex-start"
    justifyContent="center"
    spacing={4}
    sx={{
      padding: "2.5rem",
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
