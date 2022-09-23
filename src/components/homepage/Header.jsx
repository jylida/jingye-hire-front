import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import Logo from "../../static/image/Logo.svg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <AppBar position="static">
        <Toolbar
          component="nav"
          sx={{
            backgroundColor: "white",
            color: "black",
            paddingX: { xs: "1rem", md: "3rem" },
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid lightgray",
          }}
        >
          <Box
            component="img"
            src={Logo}
            alt="logo"
            sx={{
              margin: { xs: "0.5rem 0.5rem 0.5rem 0", md: "1rem 1rem 1rem 0" },
              height: "6vh",
              maxHeight: "80px",
              minHeight: "50px",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate("/register");
            }}
          >
            加入我们
          </Button>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
