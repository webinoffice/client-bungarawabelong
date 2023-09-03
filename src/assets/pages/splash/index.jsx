import * as React from 'react';
import css from './splash.module.css';

function Splash() {
    return (
        <div className={css.topPallete}>
            <img src='/logo1.png' className={css.splashLogo}/>
        </div>
    );
}

export default Splash;