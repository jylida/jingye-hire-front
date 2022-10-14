import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { axiosPrivate } from "../../../../api/axios";
import AuthContext from "../../../../context/authProvider";

const LogoutButton = (prop) => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { variant, color, ...others } = prop;

  const handleClick = async () => {
    axiosPrivate.post("/logout");
    setAuth({});
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Button
      variant={variant || "contained"}
      color={color || "error"}
      {...others}
      onClick={handleClick}
      sx={{ paddingY: 0 }}
    >
      <Typography variant="subtitle1">退出登入</Typography>
    </Button>
  );
};

export default LogoutButton;
