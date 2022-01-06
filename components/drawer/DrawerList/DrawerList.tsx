import {NextPage} from "next";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import * as React from "react";
import {Anchor} from "../Drawer";
import s from "./DrawerList.module.scss";
import {GenderSwitch} from "../../Header/genderSwitch/genderSwitch";
import {AdminWrapper} from "../../adminWrapper/AdminWrapper";
import CreateNewDish from "../../CreateNewDish/CreateNewDish";

interface IDrawerListProps {
  anchor: Anchor;

  toggleDrawer(a: Anchor, b: boolean);
}

export const DrawerList: NextPage<IDrawerListProps> = ({
                                                         anchor,
                                                         toggleDrawer,
                                                       }) => {
  const menuItemsTop = [
    {name: "ЗНИЖКИ", color: "red"},
    {name: "НОВИНКИ", color: "green"},
  ];
  const menuItemsBottom = ["НОВИНИ І ВІДГУКИ", "ДОСТАВКА, ОПЛАТА, ПОВЕРНЕННЯ"];

  return (
    <Box
      className={s.wrapper}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <GenderSwitch/>
      <List>
        {menuItemsTop.map(({name, color}, index) => (
          <ListItem button key={name}>
            <ListItemText primary={name} sx={{color}}/>
          </ListItem>
        ))}
        <ListItem button>
          <ListItemText primary={"ОДЯГ"}/>
        </ListItem>
      </List>
      <Divider color={"grey"}/>
      <List>
        {menuItemsBottom.map((text, index) => (
          <ListItem button key={text}>
            <ListItemText sx={{color: "gray"}} primary={text}/>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
