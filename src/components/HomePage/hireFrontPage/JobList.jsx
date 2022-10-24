import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import JobItem from "./JobItem";
const JobList = ({ departmentsName }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Typography variant="h5" mb={0} fontWeight="bold">
        应聘职位
      </Typography>
    </Grid>
    {departmentsName.map((dpt, index) => (
      <Grid key={"department-jobItem-" + index} item xs={12}>
        <JobItem title={dpt} />
      </Grid>
    ))}
  </Grid>
);

export default JobList;
