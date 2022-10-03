import Stack from "@mui/material/Stack";
import PersonalBasic from "./Basic";
import PersonalContact from "./Contact";
import PersonalAddress from "./Address";

const Personal = () => (
  <Stack
    direction="column"
    spacing={{ xs: 1, sm: 2, md: 3 }}
    sx={{ width: "100%" }}
  >
    <PersonalBasic />
    <PersonalContact />
    <PersonalAddress />
  </Stack>
);

export default Personal;
