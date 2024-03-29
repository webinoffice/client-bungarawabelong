import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

export default function NavigationBar({para}) {
  const navigate = useNavigate();
  const [value, setValue] = useState(para);

  return (
    <Box sx={{position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          if (newValue === 0){
            navigate('/land')
          } else if (newValue === 1){
            navigate('/favourite')
          } else if(newValue === 2){
            navigate('/settings')
          }
        }}
        
      >
        <BottomNavigationAction label="Beranda" icon={<HomeIcon />} />
        <BottomNavigationAction label="Favorit" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Pengaturan" icon={<SettingsIcon />} />
      </BottomNavigation>
    </Box>
  );
}
