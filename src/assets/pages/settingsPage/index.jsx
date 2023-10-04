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
import ListItemText from '@mui/material/ListItemText';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const step = 2;
function SettingsPage() {
    const [produk, setProduk] = useState([]);
    const [isLogin, setIsLogin] = useState("");
    const navigate = useNavigate();

    const grabHandler = async () => {
      try {
        const response = await axios.get("http://localhost:8081/islogin");
        const decoded = jwt_decode(response.data.accessToken);
        setIsLogin(decoded.shop_id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
        grabHandler();
    }, []);

    return (
        isLogin !== "" ? 
        (<div className={css.topPallete}>
            <SearchAppBar/>
            <Typography gutterBottom sx={{
                fontWeight:"bold", 
                fontSize: 22,
                maxWidth: '500px',
                margin: 2
            }}>
                Pengaturan  
            </Typography>
            <SettingsMenu para = {isLogin}/>
            <NavigationBar para={step}/>
        </div>) : 
        (<div className={css.topPallete}>
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
        </div>)
    );
}

export default SettingsPage;