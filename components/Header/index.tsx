import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SwipeableTemporaryDrawer from '../drawer/Drawer';
import { GenderSwitch } from './genderSwitch';
import { IconGroup } from './iconGroup';

export default function PrimarySearchAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <SwipeableTemporaryDrawer />
          <GenderSwitch />
          <Box sx={{ flexGrow: 1 }} />
          <IconGroup />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
