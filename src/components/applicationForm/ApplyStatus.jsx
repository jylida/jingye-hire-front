import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormTimeLine from "./FormSections/FormTimeLine";
const ApplyStatus = ({ progress }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        placeItems: "center",
      }}
    >
      <Typography variant="h5" color="primary" fontWeight="bold">
        您已经提交了一份申请
      </Typography>
      <FormTimeLine progress={progress} />
    </Box>
  );
};

export default ApplyStatus;
