import * as React from 'react';
import css from './settingsPage.module.css';
import NavigationBar from '../../components/navigationBar';
import SearchAppBar from '../../components/searchAppBar';
import SettingsMenu from '../../components/settingsMenu';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const step = 2;
function SettingsPage() {
    const [produk, setProduk] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const grabHandler = async () => {
            try {
              const response = await axios.get("http://localhost:8081/logincheck");
              setIsLogin(response.data.access === "true"); // Mengubah string menjadi boolean
            console.log(response)
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
    
        grabHandler();
    }, []);
    if (isLogin) {
        return (
            <div className={css.topPallete}>
                <SearchAppBar/>
                <Typography gutterBottom sx={{
                    fontWeight:"bold", 
                    fontSize: 22,
                    maxWidth: '500px',
                    margin: 2
                }}>
                    Pengaturan  
                </Typography>
                <SettingsMenu/>
                <NavigationBar para={step}/>
            </div>
        );
    }else{
        return (
            <div className={css.topPallete}>
                <SearchAppBar/>
                <Typography gutterBottom sx={{
                    fontWeight:"bold", 
                    fontSize: 22,
                    maxWidth: '500px',
                    margin: 2
                }}>
                    Pengaturan
                </Typography>
                <Box sx={{ maxWidth: 500, bgcolor: 'background.paper' }}>
                    <nav aria-label="secondary mailbox folders">
                        <List>
                            <ListItem disablePadding>
                            <ListItemButton onClick={()=>(navigate('/login'))}>
                                <ListItemText primary="Masuk Akun" />
                            </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                </Box>
                <NavigationBar para={step}/>
            </div>
        );
    }
}

export default SettingsPage;