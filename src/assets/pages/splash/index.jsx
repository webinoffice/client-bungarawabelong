import * as React from 'react';
import css from './splash.module.css';

function Splash() {
    return (
        <div className={css.topPallete}>
            <img src='/logo0t.png' className={css.splashLogo}/>
            <div style={{display: "flex", justifyContent: "center", aspectRatio: "initial", marginBottom: '30px' }}>
                <img src='/logoUBM.jpg' className={css.splashIcon} style={{height:"50px"}}/>
                <img src='/logoTut.jpg' className={css.splashIcon}/>
                <img src='/logoMerdeka.jpg' className={css.splashIcon} style={{height:'40px'}}/>
            </div>
        </div>
    );
}

export default Splash;