import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MyCustomTextField from "../Search/Search";
import SwipeableTemporaryDrawer from "../drawer/Drawer";
import { GenderSwitch } from "./genderSwitch/genderSwitch";
import { IconGroup } from "./iconGroup/IconGroup";

export default function PrimarySearchAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <SwipeableTemporaryDrawer />
          <GenderSwitch />
          <MyCustomTextField />
          <Box sx={{ flexGrow: 1 }} />
          <IconGroup />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
