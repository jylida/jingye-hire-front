import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";

import DrawerList from "./DrawerList";
import Logo from "../../static/image/Logo.svg";
const listNames = [
  { name: "学校简介", url: "/intro" },
  // { name: "招生信息", url: "/admin" },
  { name: "加入我们", url: "/hire" },
];
const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    const handleScroll = (e) => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <AppBar
      component="nav"
      position="sticky"
      elevation={0}
      sx={{
        borderBottom: { xs: "5px solid #368B91", md: "10px solid #368B91" },
        height: isSM
          ? 128 - Math.min(56, scrollY)
          : 256 - Math.min(128, scrollY),
      }}
    >
      <Toolbar
        component="nav"
        sx={{
          backgroundColor: "#f5f7f7",
          color: "black",
          paddingX: { xs: "1rem", md: "3rem" },
          paddingTop: "0.3rem", //compensate bottom margin from Container component
          height: "100%",
        }}
      >
        <Container
          maxWidth="lg"
          disableGutters={{ xs: true, md: false }}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: { xs: "space-between", md: "flex-start" },
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={Logo}
            alt="School Logo"
            sx={{
              padding: {
                xs: "0.5rem 0.5rem 0.5rem 0",
                md: "1rem 1rem 1rem 0",
              },
              height: { xs: "4rem", md: "6rem" },
            }}
          />
          <Stack
            direction="column"
            sx={{
              flexGrow: 1,
              alignItems: { xs: "center", md: "flex-start" },
            }}
          >
            <Typography
              variant="caption"
              fontFamily="serif"
              sx={{
                opacity: Math.pow(3 / Math.max(3, scrollY), 2),
              }}
            >
              呼和浩特市
            </Typography>
            <Typography
              fontWeight={900}
              sx={{
                fontSize: { xs: 30, md: 40 },
                fontFamily: "serif",
                opacity: Math.pow(3 / Math.max(3, scrollY), 2),
              }}
            >
              敬业学校
            </Typography>
          </Stack>
          {isSM ? (
            <DrawerList list={listNames} />
          ) : (
            <>
              {listNames.map((item) => (
                <Box
                  component={Link}
                  key={`Homepage-AppBar-menu-lg-${item.name}`}
                  to={item.url}
                  sx={{
                    textDecoration: "none",
                    color: "text.secondary",
                    marginRight: "1.5rem",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.name}
                  </Typography>
                </Box>
              ))}
              <MuiLink
                href="https://jingyeschool.org.cn/ims/#/login"
                sx={{
                  textDecoration: "none",
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" color="error">
                  学校信息系统
                </Typography>
              </MuiLink>
            </>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
