import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MyCustomTextField from "../Search/Search";
import { useState } from "react";
import { DialogRegister } from "./DialogAuth/DialogRegister";
import { DialogLogin } from "./DialogAuth/DialogLogin";
import { useAppSelector } from "../../redux/hooks";
import { MenuProfile } from "./menuProfile/MenuProfile";
import SwipeableTemporaryDrawer from "../drawer/Drawer";
import { GenderSwitch } from "./genderSwitch/genderSwitch";

export default function PrimarySearchAppBar() {
  const [dialogRegisterOpen, setDialogRegister] = useState(false);
  const [dialogLoginOpen, setDialogLogin] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { userData } = useAppSelector((store) => store.user);

  const openLogin = (e): void => {
    if (userData === null) {
      setDialogLogin(true);
    } else {
      handleClick(e);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <SwipeableTemporaryDrawer />
          <GenderSwitch />
          <MyCustomTextField />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton onClick={openLogin} size="large" color="inherit">
              <AccountCircle />
            </IconButton>
            <DialogLogin
              open={dialogLoginOpen}
              setLogin={setDialogLogin}
              setRegister={setDialogRegister}
            />
            <DialogRegister
              open={dialogRegisterOpen}
              setRegister={setDialogRegister}
              setLogin={setDialogLogin}
            />
            <MenuProfile
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
            />
            <IconButton size="large" color="inherit">
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={"?"} color="error">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
