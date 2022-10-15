import { useContext } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ApplicationItem from "./ApplicationListItem";
import Pagination from "@mui/material/Pagination";
import TablePagination from "@mui/material/TablePagination";
import ApplyReviewContext from "../../../context/applyReviewProvider";
import List from "@mui/material/List";
const ApplicationListFeed = () => {
  const { page, setPage, fetched, limit, setLimit } =
    useContext(ApplyReviewContext);
  if (fetched?.applications?.length === 0)
    return (
      <Typography variant="h6" fontWeight="bold" color="warning.main">
        抱歉, 未找到符合搜索条件的申请...
      </Typography>
    );

  return (
    <Stack
      direction="column"
      spacing={{ xs: 0.5 }}
      elevation={0}
      sx={{
        flexGrow: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <List sx={{ padding: 0 }}>
        {fetched.applications &&
          fetched.applications.map((application, index) => (
            <ApplicationItem
              key={`application-item-${index}`}
              application={application}
            />
          ))}
      </List>
      <TablePagination
        labelRowsPerPage="每页行数: "
        count={fetched.totalApplications}
        page={page - 1}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 15, 20]}
        onPageChange={(event, newPage) => {
          setPage(newPage + 1);
        }}
        onRowsPerPageChange={(e) => {
          setLimit(parseInt(e.target.value));
          setPage(1);
        }}
      />
    </Stack>
  );
};

export default ApplicationListFeed;
