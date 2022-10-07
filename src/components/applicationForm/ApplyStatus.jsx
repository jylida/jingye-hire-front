import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FormTimeLine from "./FormSections/FormTimeLine";
const ApplyStatus = ({ progress }) => {
  return (
    <Box
      sx={{
        padding: "0.5rem",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        placeItems: "center",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          placeItems: "center",
        }}
      >
        <Typography variant="h5" color="primary" sx={{ marginTop: "1rem" }}>
          您已经提交了一份申请
        </Typography>
        <FormTimeLine progress={progress} />
      </Paper>
    </Box>
  );
};

export default ApplyStatus;
