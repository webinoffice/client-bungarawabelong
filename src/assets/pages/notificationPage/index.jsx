import * as React from 'react';
import css from "./notificationPage.module.css";
import PageAppBar from '../../components/pageAppBar';

function NotificationPage() {
    return ( 
        <div className={css.topPallete}>
            <PageAppBar/>
        </div>
    );
}

export default NotificationPage;