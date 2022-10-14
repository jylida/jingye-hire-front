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
        padding: "1rem",
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
      <Typography
        variant="subtitle2"
        color="text.secondary"
      >{`用户名: ${application.username}  ID: ${application._id}`}</Typography>
      <Stack direction="row" spacing={{ xs: "0.5rem", sm: "1rem" }}>
        <Chip
          size="small"
          variant="outlined"
          color="secondary"
          label={application.department}
        />
        {application.isLecturer && (
          <Chip size="small" variant="outlined" color="info" label="申请教职" />
        )}
        {application.isLecturer && (
          <Chip
            variant="outlined"
            size="small"
            color="info"
            label={application.subject}
          />
        )}
        {["接受", "拒绝"].includes(
          application.progress[application.progress.length - 1]
            .applicationStatus
        ) ? (
          <Chip
            size="small"
            variant="contained"
            color={
              application.progress[application.progress.length - 1]
                .applicationStatus === "接受"
                ? "success"
                : "error"
            }
            label={
              application.progress[application.progress.length - 1]
                .applicationStatus
            }
          />
        ) : (
          <Chip
            size="small"
            variant="outlined"
            color="warning"
            label="待审理"
          />
        )}
      </Stack>
    </Box>
  );
};

export default ApplicationItem;
