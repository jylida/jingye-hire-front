import { useState, useContext } from "react";
import Refresh from "@mui/icons-material/Refresh";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import VerifiedIcon from "@mui/icons-material/Verified";
import api from "../../../api/axios";
import AuthContext from "../../../context/authProvider";

const Captcha = ({ state }) => {
  const [message, setMessage] = useState("请输入验证码");
  const [text, setText] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [imgStr, setImgStr] = useState("");
  const { captchaMatch, setCaptchaMatch } = useContext(AuthContext);

  useState(() => {
    api.get("/captcha").then((response) => {
      setImgStr(response.data.imageString);
    });
  }, []);
  const handleValidate = async () => {
    try {
      await api.post("/captcha", { text });
      setCaptchaMatch(true);
      setMessage("验证成功!");
      localStorage.removeItem("authStored");
    } catch (err) {
      setCaptchaMatch(false);
      setMessage("输入错误, 请点击刷新按钮重试.");
      setDisabled(true);
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
        {imgStr ? (
          <img src={`data:image/png;base64,${imgStr}`} alt="captcha image" />
        ) : (
          <p>Loading...</p>
        )}
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
      <Stack direction="row" spacing={1} width="100%">
        <TextField
          disabled={captchaMatch || disabled}
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
