import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { axiosPrivate } from "../../../../api/axios";

const LogoutButton = ({ setAuth }) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="outlined"
      color="error"
      onClick={async () => {
        axiosPrivate.post("/logout");
        setAuth({});
        localStorage.clear();
        navigate("/login");
      }}
      sx={{ paddingY: 0 }}
    >
      <Typography variant="subtitle1" color="error">
        退出登入
      </Typography>
    </Button>
  );
};

export default LogoutButton;
