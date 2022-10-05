import Typography from "@mui/material/Typography";
const ApplyFeedBack = ({ applyNum, phone }) => (
  <Typography variant="h6" fontWeight="bold" color="success.light">
    {`提交成功! 申请号: ${applyNum}.`} <br />
    {`我们将会在10个工作日内联系您. 请确保手机号 ${phone} 畅通.`}
    <br />
    {"感谢您对本校的青睐!"}
  </Typography>
);

export default ApplyFeedBack;
