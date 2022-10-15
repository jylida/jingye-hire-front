import { useState, useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import Container from "@mui/material/Container";
import LogoutButton from "../applicationForm/FormSections/utils/LogoutButton";
import Logout from "@mui/icons-material/LogoutOutlined";
import { subjectNames } from "../applicationForm/FormSections/utils/options";
import { departmentNames } from "../applicationForm/FormSections/utils/options";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { InputLabel, MenuItem } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import useMediaQuery from "@mui/material/useMediaQuery";
import ApplyReviewContext from "../../context/applyReviewProvider";

const drawerWidth = 240;
const FilterTitle = ({ title }) => (
  <FormLabel id={`apply-review-listFilter-${title}`}>
    <Typography variant="subtitle2" color="text.secondary">
      {title}
    </Typography>
  </FormLabel>
);

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    paddingX: { xs: 0, md: theme.spacing(3) },
    paddingBottom: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function DrawerLayout({ title, children }) {
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(!isSM);
  const {
    handled,
    setHandled,
    isLecturer,
    setIsLecturer,
    subject,
    setSubject,
    department,
    setDepartment,
    // state,
    // dispatch,
    // actionType,
  } = useContext(ApplyReviewContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const ApplicationFilters = [
    <FormControl>
      <FilterTitle title="是否已受理" />
      <RadioGroup
        row
        value={handled}
        onChange={(e) => setHandled(e.target.value)}
        name="apply-review-listFilter-是否已受理"
      >
        <FormControlLabel value={true} control={<Radio />} label="是" />
        <FormControlLabel value={false} control={<Radio />} label="否" />
        <FormControlLabel value={"all"} control={<Radio />} label="全部" />
      </RadioGroup>
    </FormControl>,
    <FormControl>
      <FilterTitle title="是否申请教职" />
      <RadioGroup
        row
        value={isLecturer}
        onChange={(e) => setIsLecturer(e.target.value)}
        name="apply-review-listFilter-是否申请教职"
      >
        <FormControlLabel value={true} control={<Radio />} label="是" />
        <FormControlLabel value={false} control={<Radio />} label="否" />
        <FormControlLabel value={"all"} control={<Radio />} label="全部" />
      </RadioGroup>
    </FormControl>,
    <FormControl variant="standard" fullWidth>
      <InputLabel id="apply-review-listFilter-学科">学科</InputLabel>
      <Select
        labelId="apply-review-listFilter-学科"
        id="apply-review-listFilter-subject"
        value={subject}
        label="学科"
        onChange={(e) => setSubject(e.target.value)}
      >
        <MenuItem value="all">全部</MenuItem>
        {subjectNames.map((nm) => (
          <MenuItem
            key={`apply-review-listFilter-subject-item-${nm}`}
            value={nm}
          >
            {nm}
          </MenuItem>
        ))}
      </Select>
    </FormControl>,
    <FormControl variant="standard" fullWidth>
      <InputLabel id="apply-review-listFilter-部门">部门</InputLabel>
      <Select
        labelId="apply-review-listFilter-部门"
        id="apply-review-listFilter-department"
        value={department}
        label="部门"
        onChange={(e) => setDepartment(e.target.value)}
      >
        <MenuItem value="all">全部</MenuItem>
        {departmentNames.map((nm) => (
          <MenuItem
            key={`apply-review-listFilter-department-item-${nm}`}
            value={nm}
          >
            {nm}
          </MenuItem>
        ))}
      </Select>
    </FormControl>,
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {ApplicationFilters && (
          <List>
            {ApplicationFilters.map((filter, index) => (
              <ListItem key={`sidebar-filter-list-item-${index}`}>
                {filter}
              </ListItem>
            ))}
          </List>
        )}
        <List>
          <ListItem>
            <LogoutButton variant="text" endIcon={<Logout />} fullWidth />
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Container maxWidth="md" sx={{ padding: { xs: 0, sm: "1rem" } }}>
          {children}
        </Container>
      </Main>
    </Box>
  );
}
