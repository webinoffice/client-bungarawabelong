import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function PageAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color='background'>
        <Toolbar>
            <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}/>
          {/* <IconButton
            size="large"
            edge="end"
            color="primary"
            aria-label="menu"
          >
            <SearchIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </Box>
  );
}