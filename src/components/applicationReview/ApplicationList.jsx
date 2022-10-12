import { useContext } from "react";
import Stack from "@mui/material/Stack";
import ApplicationItem from "./ApplicationItem";
import Pagination from "@mui/material/Pagination";
import ApplyReviewContext from "../../context/applyReviewProvider";
const ApplicationList = () => {
  const { page, setPage, limit, setLImit, fetched } =
    useContext(ApplyReviewContext);
  return (
    <Stack
      direction="column"
      spacing={{ xs: 0.5, sm: 1, md: 1.5 }}
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
        color="secondary"
        hideNextButton={page === fetched.totalPages}
        hidePrevButton={page === 1}
      />
    </Stack>
  );
};

export default ApplicationList;
