import { useContext } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ApplicationItem from "./ApplicationListItem";
import Pagination from "@mui/material/Pagination";
import ApplyReviewContext from "../../../context/applyReviewProvider";
const ApplicationListFeed = () => {
  const { page, setPage, limit, setLImit, fetched } =
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
      {fetched.applications &&
        fetched.applications.map((application, index) => (
          <ApplicationItem
            key={`application-item-${index}`}
            application={application}
          />
        ))}
      <Pagination
        onChange={(event, value) => {
          setPage(value);
        }}
        count={fetched.totalPages}
        page={page}
        color="primary"
        hideNextButton={page === fetched.totalPages}
        hidePrevButton={page === 1}
      />
    </Stack>
  );
};

export default ApplicationListFeed;
