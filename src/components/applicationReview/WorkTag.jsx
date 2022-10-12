import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const WorkTag = ({ work }) => (
  <Grid item xs={12} md={6} lg={4}>
    <Stack
      direction="column"
      spacing={1}
      sx={{
        paddling: "1rem",
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        {work.place}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {`入职时间: ${work.from} 离职时间: ${work.to}`}
      </Typography>
      <Typography variant="subtitle2">{`职位: ${work.title}`}</Typography>
      <Typography variant="subtitle2" fontWeight="bold">
        {`工作详情`}
      </Typography>
      <Typography variant="body2">{work.specific}</Typography>
      <Typography
        variant="subtitle2"
        fontWeight="bold"
      >{`离职原因 `}</Typography>
      <Typography variant="body2">{work.reasonOnLeave}</Typography>
    </Stack>
  </Grid>
);

export default WorkTag;
