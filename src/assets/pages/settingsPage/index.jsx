import * as React from 'react';
import css from './settingsPage.module.css';
import NavigationBar from '../../components/navigationBar';
import SearchAppBar from '../../components/searchAppBar';
import SettingsMenu from '../../components/settingsMenu';
import { Typography } from '@mui/material';

function SettingsPage() {
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
            <NavigationBar/>
        </div>
    );
}

export default SettingsPage;