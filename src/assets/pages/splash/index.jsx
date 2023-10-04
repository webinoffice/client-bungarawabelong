import * as React from 'react';
import css from './splash.module.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Splash() {
    const navigate = useNavigate();
    useEffect(() => {
        const myFunction = () => {
          navigate('/land');
        };
    
        const timeoutId = setTimeout(myFunction, 5000);
    
        return () => {
          clearTimeout(timeoutId);
        };
      }, []); 
    return (
        <div className={css.topPallete}>
            <img src='/logo0t.png' className={css.splashLogo}/>
            <div style={{
                display: "flex", 
                justifyContent: "center", 
                aspectRatio: "initial", 
                position: 'absolute' ,
                bottom: '0',
                width: '100%',
                marginBottom: '40px'
            }}>
                <img src='/logo ubm.png' className={css.splashIcon} style={{height:"50px"}}/>
                <img src='/TUT WURI.png' className={css.splashIcon}/>
                <img src='/logoMerdeka1.png' className={css.splashIcon} style={{height:'35px'}}/>
            </div>
        </div>
    );
}

export default Splash;