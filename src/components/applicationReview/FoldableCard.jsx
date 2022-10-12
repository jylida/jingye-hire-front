import { useState } from "react";
import styled from "@mui/material/styles/styled";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";

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
const FordableCard = ({ title, children }) => {
  const [expand, setExpand] = useState(false);
  return (
    <Card
      sx={{
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
            {title.split("").slice(0, 1)}
          </Avatar>
        }
        action={
          <ExpandMore
            expand={expand}
            onClick={() => {
              setExpand(!expand);
            }}
          >
            <ExpandMoreOutlined />
          </ExpandMore>
        }
        title={title}
      />
      <Collapse in={expand} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </Card>
  );
};

export default FordableCard;
