import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MyCustomTextField from "../Search/Search";
import { useState } from "react";
import { DialogRegister } from "./DialogAuth/DialogRegister";
import { DialogLogin } from "./DialogAuth/DialogLogin";
import { useAppSelector } from "../../redux/hooks";
import { MenuProfile } from "./menuProfile/MenuProfile";

export default function PrimarySearchAppBar() {
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const token = useAppSelector((store) => store.user.token);

  const openLogin = (e): void => {
    if (token === null) {
      setLogin(true);
    } else {
      handleClick(e);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <MyCustomTextField />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton onClick={openLogin} size="large" color="inherit">
              <AccountCircle />
            </IconButton>
            <DialogLogin
              open={login}
              setLogin={setLogin}
              setRegister={setRegister}
            />
            <DialogRegister
              open={register}
              setRegister={setRegister}
              setLogin={setLogin}
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
