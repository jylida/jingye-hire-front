import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { axiosPrivate } from "../../../../api/axios";
import AuthContext from "../../../../context/authProvider";

const LogoutButton = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = async () => {
    axiosPrivate.post("/logout");
    setAuth({});
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Button
      variant="contained"
      color="error"
      onClick={handleClick}
      sx={{ paddingY: 0 }}
    >
      <Typography variant="subtitle1">退出登入</Typography>
    </Button>
  );
};

export default LogoutButton;
