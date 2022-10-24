import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

const Footer = () => {
  return (
    <Stack component="footer" direction="column" alignItems="center">
      <p style={{ fontWeight: "bold", fontSize: 10 }}>
        版权&copy;{new Date().getFullYear()} 呼和浩特市敬业学校
      </p>
      <Link
        variant="caption"
        href="https://beian.miit.gov.cn/#/Integrated/index"
        underline="none"
        color="text.secondary"
      >
        {" "}
        蒙ICP备2022003259号-1
      </Link>
    </Stack>
  );
};
export default Footer;
