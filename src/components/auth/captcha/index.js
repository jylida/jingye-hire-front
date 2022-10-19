import { useState, useContext } from "react";
import Refresh from "@mui/icons-material/Refresh";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import VerifiedIcon from "@mui/icons-material/Verified";
import api, { BASE_URL } from "../../../api/axios";
import AuthContext from "../../../context/authProvider";

const Captcha = ({ state }) => {
  const [message, setMessage] = useState("请输入验证码");
  const [text, setText] = useState("");
  const { captchaMatch, setCaptchaMatch } = useContext(AuthContext);
  let captchaImg = (
    <img
      src={`${BASE_URL}/captcha`}
      alt="captcha image"
      height={50}
      width={200}
    />
  );
  const handleValidate = async () => {
    try {
      const result = await api.post("/captcha", { text: text.toLowerCase() });
      setCaptchaMatch(result.data.match);
      setMessage("验证成功");
    } catch (err) {
      setMessage("输入错误, 请重新输入!");
      setTimeout(() => handleRefresh(), 1000);
    } finally {
      setText("");
      localStorage.removeItem("authStored");
    }
  };
  const handleRefresh = () => {
    try {
      localStorage.removeItem("authStored");
      localStorage.setItem("authStored", JSON.stringify({ ...state }));
      window.location.reload();
    } catch (err) {
      setMessage(err.message + "请重新输入");
    } finally {
      setText("");
    }
  };
  return captchaMatch ? (
    <Stack direction="row" spacing={2}>
      <VerifiedIcon color="success" />
      <Typography variant="subtitle2" color="success.main">
        {message}
      </Typography>
    </Stack>
  ) : (
    <Stack
      direction="column"
      alignItems="center"
      spacing={1}
      sx={{
        padding: { xs: "0.5rem", md: "1rem" },
        border: "1px solid lightgrey",
        borderRadius: "4px",
      }}
    >
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
      <Stack
        direction="row"
        sx={{
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {captchaImg}
        <Button
          disabled={captchaMatch}
          variant="contained"
          sx={{ height: "100%" }}
          disableElevation
          onClick={handleRefresh}
        >
          <Refresh />
        </Button>
      </Stack>
      <Stack direction="row" spacing={1}>
        <TextField
          disabled={captchaMatch}
          value={text}
          fullWidth
          size="small"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <Button
          variant="contained"
          color={captchaMatch ? "success" : "primary"}
          disableElevation
          disabled={captchaMatch}
          onClick={handleValidate}
        >
          {captchaMatch ? <VerifiedIcon /> : "验证"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default Captcha;
