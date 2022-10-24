import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import HireCover from "../../../static/image/hire.jpg";
import BackHomeButton from "../BackHomeButton";
import Paragraph from "../Paragraph";
// import JobList from "./JobList";

const HireFrontPage = () => {
  const navigate = useNavigate();
  // const departmentsName = "初中教学部,高中教学部,其他".split(",");
  const handleClick = () => {
    navigate("/register");
  };
  return (
    <Stack width="100%" direction="column" flexGrow={1}>
      <Box
        component="img"
        src={HireCover}
        alt="hire"
        sx={{
          width: "100%",
          height: { xs: "100%", md: "500px" },
          objectFit: { xs: "contain", md: "cover" },
        }}
      />
      <Container maxWidth="md">
        <Stack
          direction="column"
          sx={{
            paddingY: { xs: "2rem", md: "4rem" },
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {/* <Grid
        container
        sx={{
          width: "100%",
          padding: { xs: "1rem", md: "2rem" },
        }}
      > */}
          {/* <Grid item xs={12} md={6}>
          <JobList departmentsName={departmentsName} />
        </Grid> */}
          {/* <Grid
          item
          xs={12}
          md={6}
          sx={{
            padding: { xs: "2rem", md: "4rem" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        > */}
          <Box width="100%">
            <BackHomeButton />
          </Box>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              width: "100%",
              paddingBottom: "2rem",
              alignItems: "center",
              justifyContent: { xs: "space-between", md: "flex-start" },
            }}
          >
            <Typography variant="h4" fontWeight="bold" fontFamily="serif">
              加入我们
            </Typography>
            <Button
              variant="outlined"
              color="success"
              onClick={handleClick}
              disableElevation
            >
              开始申请
            </Button>
          </Stack>
          <Stack
            direction="column"
            sx={{
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Paragraph>
              若您有意申请本校工作，您可先移步学校的公众号 "呼和浩特市敬业学校"
              了解最新的招聘信息。之后您可在此网页点击“开始申请”按钮进入在线申请系统。
            </Paragraph>
            <Paragraph>
              进入在线申请系统后您需要先完成注册，完成后就可以登陆系统开始在线申请。申请时您需要提供以下四类信息:
              {
                <ol>
                  <li>个人信息</li>
                  <li>求职信息</li>
                  <li>学历背景</li>
                  <li>工作经历</li>
                </ol>
              }
              所有信息请务必如实填写。填写求职信息时请确认您是否申请教职；如果申请教职则须勾选相应选项，并提供与相应学科相关并仍然有效的教师资格证号码。
              填写学历背景时请尽量提交所有的高等教育学习经历。若已毕业，还须要提供相应的学历、学位证书照片。照片格式目前只限于jpg、jpeg、以及png。
              工作经历并非为必填项，不过与您所申请的职位相匹配的经历会增加您获得面试的机会，还烦请您酌情填写。
            </Paragraph>
            <Paragraph color="warning.main">
              请注意！申请中的任何虚假陈述都有可能造成您的申请或者之后的入职无效！
            </Paragraph>
            <Paragraph>感谢您对本校的青睐。</Paragraph>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};
export default HireFrontPage;
