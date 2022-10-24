import { Fragment, useReducer } from "react";
import styled from "@mui/material/styles/styled";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import Box from "@mui/material/Box";
import createInitialState from "../../../utils/createInitialState";

const actionType = {
  item: "item",
  subjects: "subjects",
};

const reducer = (state, action) => {
  const subject = action.payload;
  switch (action.type) {
    case actionType.item:
      return {
        ...state,
        item: !state.item,
      };
    case actionType.subjects:
      return {
        ...state,
        subjects: { ...state.subjects, [subject]: !state.subjects[subject] },
      };
    default:
      throw new Error("No action type matches");
  }
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(90deg)" : "rotate(0deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const JobItem = ({
  subjectsNameEn = "lit,math,eng,phy,chem,bio,pol,chem,geo,other".split(","),
  subjectsNameCn = "语文 数学 英语 物理 化学 生物 政治 历史 地理 其他".split(
    " "
  ),
  title = "初中教学部",
  number = 0,
  requirement = Array(subjectsNameEn.length).fill("None"),
}) => {
  const subjectsInit = createInitialState(subjectsNameEn);
  const init = { expanded: false, subjects: subjectsInit };
  const [state, dispatch] = useReducer(reducer, init);

  return (
    <Card
      sx={{
        width: "100%",
        minWidth: "200px",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            variant="circular"
            sx={{
              backgroundColor: "white",
              color: "blueviolet",
              border: "2px solid blueviolet",
              fontWeight: "bold",
            }}
          >
            {title.slice(0, 1)}
          </Avatar>
        }
        action={
          <ExpandMore
            expand={state.item}
            onClick={() => {
              dispatch({ type: actionType.item });
            }}
          >
            <ExpandMoreOutlined />
          </ExpandMore>
        }
        title={title}
      />
      <Collapse in={state.item} timeout="auto" unmountOnExit>
        <List>
          {subjectsNameEn.map((subNm, index) => (
            <Fragment key={"subject-name-number-" + index}>
              <ListItemButton
                key={"subject-name-index-" + index}
                onClick={() =>
                  dispatch({ type: actionType.subjects, payload: subNm })
                }
              >
                <ListItemIcon>
                  <Avatar
                    sx={{
                      backgroundColor: "white",
                      color: "blue",
                      border: "1px solid blue",
                    }}
                  >
                    {subjectsNameCn[index].slice(0, 1)}
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={subjectsNameCn[index]}
                  secondary={"数量: " + number || 1}
                />
                {state.subjects[subNm] && state.item ? (
                  <ExpandLess />
                ) : (
                  <>
                    <Typography
                      variant="button"
                      component="span"
                      sx={{ color: "gray" }}
                    >
                      岗位要求
                    </Typography>
                    <ExpandMoreOutlined />
                  </>
                )}
              </ListItemButton>
              <Collapse
                key={"subject-name-collapse-index-" + index}
                in={state.subjects[subNm] && state.item}
                timeout="auto"
                unmountOnExit
                sx={{
                  padding: "0 1rem 0 4.5rem",
                }}
              >
                <Box component="section">
                  <Typography variant="subtitle1" fontWeight="bold">
                    岗位要求
                  </Typography>
                  <Typography variant="paragraph">
                    <ol>
                      {requirement[index]
                        .split(";")
                        .filter((req) => req.length > 0)
                        .map((req, i) => (
                          <li
                            key={[subNm, "requirement", "index", i].join("-")}
                          >
                            {req}
                          </li>
                        ))}
                    </ol>
                  </Typography>
                </Box>
              </Collapse>
            </Fragment>
          ))}
        </List>
      </Collapse>
    </Card>
  );
};

export default JobItem;
