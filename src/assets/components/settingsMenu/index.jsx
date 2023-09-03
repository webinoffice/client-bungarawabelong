import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InventoryIcon from '@mui/icons-material/Inventory';

export default function SettingsMenu() {
  return (
    <Box sx={{ maxWidth: 500, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon color='primary'/>
              </ListItemIcon>
              <ListItemText primary="Profil Toko" sx={{
                fontWeight:"bold", 
                fontSize: 20,
                }}/>
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InventoryIcon color='primary'/>
              </ListItemIcon>
              <ListItemText primary="Kelola Produk" sx={{
                fontWeight:"bold", 
                fontSize: 20,
                }}/>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Keluar Akun" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
