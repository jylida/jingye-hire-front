import { Fragment, useState } from "react";
import styled from "@mui/material/styles/styled";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

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

const InfoCard = ({ title, infoObjArray }) => {
  const [expand, setExpand] = useState(false);
  return (
    <Grid
      item
      xs={12}
      sm={expand ? 12 : 6}
      lg={expand ? 12 : 4}
      sx={{ paddingRight: 2 }}
    >
      <Card
        sx={{
          minWidth: "200px",
        }}
      >
        <CardHeader
          avatar={
            title && (
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
            )
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
          <List>
            {infoObjArray.map((infoObj) => (
              <ListItem key={`InfoCard-${title}-item-${infoObj.enNm}`}>
                <ListItemText
                  primary={infoObj.value}
                  secondary={infoObj.cnNm}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Card>
    </Grid>
  );
};

export default InfoCard;
