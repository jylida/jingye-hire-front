import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import BackHomeButton from "./BackHomeButton";
import Paragraph from "./Paragraph";
const Introduction = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        flexGrow: 1,
      }}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        sx={{
          padding: { xs: "1rem", md: "2rem" },
          marginTop: { xs: "1rem", md: "2rem" },
        }}
      >
        <Box width="100%">
          <BackHomeButton />
        </Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          fontFamily="serif"
          sx={{
            paddingBottom: { xs: "1rem", md: "2rem" },
          }}
        >
          学校简介
        </Typography>
        <Paragraph>
          敬业学校是呼和浩特经市教育局批准成立的第一所民办完全中学,现为呼
          和浩特市民办教育十强、自治区“依法治校示范校”和“民办学校示范校”双
          示范校。
        </Paragraph>
        <Paragraph>
          敬业学校初、高中共有 84 个教学班,4600 余名在校生。学校分两个校
          区,初中部在东校区,高中部在南校区。学校办学规范,管理严格,各项规章
          制度健全。学校以德育为先,将社会主义核心价值观融入课堂教学和各项活动
          之中。校园文化丰富多彩,诗歌朗诵、书法展览、普通话比赛等形式多样的课
          外活动接连不断,队列和广播体操、篮球、排球、拔河等各项体育比赛此起彼
          伏。建校以来,已成功举办了 22 届田径运动会和 23 届“秋之韵”文化艺术周
          活动。敬业学校因材施教,认真落实教学常规,严格执行课程标准,按教学计
          划开齐、开足课程;学生管理科学严谨,有完备的班主任制度和学生管理制
          度,学生社团组织活动形式多样。全校学生秉承“崇实、求是、敬业、成才”
          的校训,遵守纪律,刻苦学习,德智体美全面发展,各项竞赛成绩斐然。
          学校教学成果丰硕,升学率逐年提高。2016 高考,参加考试的 389 名考
          生中,600 分以上的有 3 人。上一本线的有 197 人(不含音、体、艺),占 5
          0.6%。二本上线率达到 99.1%(不含音、体、艺)。
        </Paragraph>
        <Paragraph>
          敬业学校在办学之初就成立了党支部,现有共产党员 90 人,曾多次被呼
          和浩特市教育局党委和赛罕区教育局党委评为“先进基层党组织”,2012 年被
          命名为市级非公有制企业和社会组织党建工作示范点。
        </Paragraph>
      </Stack>
    </Container>
  );
};

export default Introduction;
