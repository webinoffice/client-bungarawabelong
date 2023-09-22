import * as React from 'react';
import css from "./notificationPage.module.css";
import PageAppBar from '../../components/pageAppBar';
import NotificationList from '../../components/notificationList';
import { Typography } from '@mui/material';

function NotificationPage() {
    return ( 
        <div className={css.topPallete}>
            <PageAppBar/>
            <Typography gutterBottom sx={{
                fontWeight:"bold", 
                fontSize: 22,
                maxWidth: '500px',
                margin: 2
            }}>
                Notifikasi Pesanan
            </Typography>
            <NotificationList/>
        </div>
    );
}

export default NotificationPage;