import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
const ApplicationItem = ({ application }) => {
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <ListItem>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 1, md: 4 }}
          sx={{
            justifyContent: { xs: "center", md: "flex-start" },
            alignItems: { xs: "flex-start", md: "center" },
            padding: { xs: "0.2rem", md: "1rem" },
            width: "100%",
          }}
        >
          <Box>
            <Typography
              to={`./${application._id}`}
              variant="h5"
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
            >{`用户名: ${application.username} 性别: ${application.gender}`}</Typography>
          </Box>
          <Stack direction="row" spacing={{ xs: "0.5rem", sm: "1rem" }}>
            <Chip
              size={isSM ? "small" : "medium"}
              variant="outlined"
              color="secondary"
              label={application.department}
            />

            {application.isLecturer && (
              <Chip
                variant="outlined"
                size={isSM ? "small" : "medium"}
                color="info"
                label="申请教职"
              />
            )}
            {application.isLecturer && (
              <Chip
                variant="outlined"
                size={isSM ? "small" : "medium"}
                color="info"
                label={application.subject}
              />
            )}
            {application.handled ? (
              <Chip
                variant="contained"
                size={isSM ? "small" : "medium"}
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
                size={isSM ? "small" : "medium"}
                variant="outlined"
                color="warning"
                label="待审理"
              />
            )}
          </Stack>
        </Stack>
      </ListItem>
      <Divider />
    </>
  );
};

export default ApplicationItem;
