import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fileDownload from "js-file-download";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ApplyReviewContext from "../../context/applyReviewProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import InfoCard from "./InfoCard";
import TableCard from "./TableCard";
import FordableCard from "./FoldableCard";
import WorkTag from "./WorkTag";
import {
  infoObjContactArray,
  infoObjJobArray,
  infoObjPersonalArray,
} from "./propNames";
import UpdateStatusButton from "./UpdateStatusButton";

const ApplicationPost = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const [feedback, setFeedback] = useState(undefined);
  const [updated, setUpdated] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const { fetched } = useContext(ApplyReviewContext);
  const application = fetched?.applications?.find(
    (application) => application._id === id
  );
  if (!application) {
    return (
      <Typography variant="h5" fontWeight="bold">
        fetching...
      </Typography>
    );
  }
  const handleDownload = async (url, fileName) => {
    const response = await axiosPrivate.get(url, {
      responseType: "blob",
      headers: {
        "Content-Type": "application/zip",
      },
    });
    fileDownload(response.data, fileName);
  };
  return (
    <Stack direction="column" spacing={{ xs: 1, sm: 2 }}>
      <Stack
        direction="row"
        justifyContent="flex-start"
        spacing={{ xs: 3, sm: 4 }}
      >
        <Typography variant="h6">{`??????: ${application.name}`}</Typography>
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate("..")}
          sx={{ paddingY: 0 }}
        >
          ???????????????
        </Button>
      </Stack>
      <Typography
        variant="overline"
        color="text.secondary"
      >{`????????????: ${new Date(
        application.progress[0].lodgeDate
      ).toDateString()}`}</Typography>
      <Grid
        container
        spacing={{ xs: 1, sm: 1.5, md: 2 }}
        sx={{ width: "100%" }}
      >
        <InfoCard
          title="????????????"
          infoObjArray={infoObjPersonalArray(application)}
        />
        <InfoCard
          title="????????????"
          infoObjArray={infoObjContactArray(application)}
        />
        <InfoCard
          title="????????????"
          infoObjArray={infoObjJobArray(application)}
        />
        {application.education.length > 0 && (
          <TableCard
            title="????????????"
            colNames={
              "???????????? ???????????? ???????????? ?????? ???????????? ???????????? ???????????????"
            }
            bgSeq={application.education}
          />
        )}
        {application.work.length > 0 && (
          <Grid item xs={12} paddingRight="1rem">
            <FordableCard title="????????????">
              <Grid
                container
                sx={{ width: "100%", padding: { xs: "1rem", md: "2rem" } }}
              >
                {application.work.map((work, index) => (
                  <WorkTag
                    key={`workExperience-workTag-${index}`}
                    work={work}
                  />
                ))}
              </Grid>
            </FordableCard>
          </Grid>
        )}
        <Grid item xs={12} md={4}>
          {application?.uploadFile ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                handleDownload(
                  `/download/${application.username}`,
                  `${application.username}.zip`
                )
              }
            >
              ??????????????????
            </Button>
          ) : (
            <Typography variant="h6" fontWeight="bold" color="info.main">
              ??????????????????????????????
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          {updated ||
          ["??????", "??????"].includes(
            application.progress[application.progress.length - 1]
              .applicationStatus
          ) ? (
            <Typography variant="h6" color="success.light">
              {`???????????????: ${
                updated
                  ? feedback
                  : application.progress[application.progress.length - 1]
                      .applicationStatus
              }`}
            </Typography>
          ) : (
            <Stack
              direction="row"
              spacing={{ xs: 2, sm: 3 }}
              justifyContent="flex-start"
              alignItems="flex-end"
            >
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  {" "}
                  ????????????
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                >
                  <FormControlLabel
                    value="??????"
                    control={<Radio />}
                    label="??????"
                  />
                  <FormControlLabel
                    value="??????"
                    control={<Radio />}
                    label="??????"
                  />
                </RadioGroup>
              </FormControl>
              {feedback && (
                <UpdateStatusButton
                  username={application.username}
                  feedback={feedback}
                  setUpdated={setUpdated}
                  setErrMsg={setErrMsg}
                />
              )}
              {errMsg && (
                <Typography variant="h6" color="error">
                  {errMsg}
                </Typography>
              )}
            </Stack>
          )}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ApplicationPost;
