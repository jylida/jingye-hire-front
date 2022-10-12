import { useContext } from "react";
import { useParams } from "react-router-dom";
import fileDownload from "js-file-download";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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

const ApplicationPost = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
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
    <Stack direction="column" spacing={{ xs: 1, sm: 2, md: 3 }}>
      <Typography
        variant="h5"
        fontWeight="bold"
      >{`姓名: ${application.name}`}</Typography>
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
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ApplicationPost;
