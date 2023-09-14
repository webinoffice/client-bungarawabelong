import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

export default function SearchAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color='background'>
        <Toolbar>
          <img src='./logo1.png' style={{height:23}}/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}/>
          <IconButton
            size="large"
            edge="end"
            color="primary"
            aria-label="menu"
          >
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </Box>
  );
}