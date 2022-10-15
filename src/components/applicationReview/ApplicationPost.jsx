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
        <Typography variant="h6">{`姓名: ${application.name}`}</Typography>
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate("..")}
          sx={{ paddingY: 0 }}
        >
          返回上一页
        </Button>
      </Stack>
      <Typography
        variant="overline"
        color="text.secondary"
      >{`申请时间: ${new Date(
        application.progress[0].lodgeDate
      ).toDateString()}`}</Typography>
      <Grid
        container
        spacing={{ xs: 1, sm: 1.5, md: 2 }}
        sx={{ width: "100%" }}
      >
        <InfoCard
          title="个人信息"
          infoObjArray={infoObjPersonalArray(application)}
        />
        <InfoCard
          title="联系方式"
          infoObjArray={infoObjContactArray(application)}
        />
        <InfoCard
          title="职位信息"
          infoObjArray={infoObjJobArray(application)}
        />
        {application.education.length > 0 && (
          <TableCard
            title="学历背景"
            colNames={
              "入学时间 毕业时间 学校名称 学位 专业大类 专业名称 是否已毕业"
            }
            bgSeq={application.education}
          />
        )}
        {application.work.length > 0 && (
          <Grid item xs={12} paddingRight="1rem">
            <FordableCard title="工作经历">
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
              下载个人资料
            </Button>
          ) : (
            <Typography variant="h6" fontWeight="bold" color="info.main">
              申请者未上传任何资料
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          {updated ||
          ["接受", "拒绝"].includes(
            application.progress[application.progress.length - 1]
              .applicationStatus
          ) ? (
            <Typography variant="h6" color="success.light">
              {`申请已处理: ${
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
                  审核状态
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                >
                  <FormControlLabel
                    value="接受"
                    control={<Radio />}
                    label="接受"
                  />
                  <FormControlLabel
                    value="拒绝"
                    control={<Radio />}
                    label="拒绝"
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
