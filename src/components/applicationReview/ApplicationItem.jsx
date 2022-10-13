import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
const ApplicationItem = ({ application }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: { xs: "1rem", md: "1.5rem" },
        minHeight: "80px",
        width: "100%",
      }}
    >
      <Typography
        to={`./${application._id}`}
        variant="h6"
        fontWeight="bold"
        component={Link}
        sx={{
          textDecoration: "none",
        }}
      >
        {application.name}
      </Typography>
      <Typography variant="subtitle1">{`用户名: ${application.username}`}</Typography>
      <Stack direction="row" spacing={{ xs: "0.5rem", sm: "1rem" }}>
        <Chip
          variant="outlined"
          color="secondary"
          label={application.department}
        />
        {application.isLecturer && (
          <Chip variant="outlined" color="info" label="申请教职" />
        )}
        {application.isLecturer && (
          <Chip variant="outlined" color="info" label={application.subject} />
        )}
      </Stack>
    </Box>
  );
};

export default ApplicationItem;
