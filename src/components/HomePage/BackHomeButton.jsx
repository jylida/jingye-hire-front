import { useNavigate } from "react-router-dom";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
const BackHomeButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="text"
      size="small"
      onClick={() => navigate("/")}
      startIcon={<ArrowBackIos />}
    >
      返回主页
    </Button>
  );
};

export default BackHomeButton;
