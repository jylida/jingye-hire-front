import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { Divider } from "@mui/material";
const AuthContainerXS = ({ children }) => (
  <Stack
    component={Paper}
    variant="outlined"
    direction="column"
    alignContent="flex-start"
    justifyContent="center"
    spacing={4}
    sx={{
      padding: "2rem",
      width: "100vw",
      maxWidth: "480px",
      maxHeight: "800px",
    }}
  >
    {children}
  </Stack>
);
const AuthContainer = ({ children }) => (
  <Stack
    component={Paper}
    variant="outlined"
    direction="row"
    divider={<Divider orientation="vertical" flexItem />}
    spacing={4}
    sx={{
      padding: "2rem",
      width: "100vw",
      maxWidth: "800px",
      minHeight: "300px",
      maxHeight: "600px",
    }}
  >
    {children}
  </Stack>
);

export { AuthContainer, AuthContainerXS };
