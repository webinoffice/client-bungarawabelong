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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useNavigate } from 'react-router-dom';

export default function SettingsMenu() {
  const navigate = useNavigate();
  return (
    <Box sx={{ maxWidth: 500, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={()=> navigate('/profile')}>
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
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={()=> navigate('/add-product')}>
              <ListItemIcon>
                <AddCircleOutlineIcon color='primary'/>
              </ListItemIcon>
              <ListItemText primary="Tambah Produk" sx={{
                fontWeight:"bold", 
                fontSize: 20,
                }}/>
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={()=> navigate('/notification')}>
              <ListItemIcon>
                <NotificationsActiveIcon color='primary'/>
              </ListItemIcon>
              <ListItemText primary="Notifikasi Pesanan" sx={{
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
