import * as React from 'react';
import css from './favouritePage.module.css';
import NavigationBar from '../../components/navigationBar';
import SearchAppBar from '../../components/searchAppBar';
import FavouriteMap from '../../components/favouriteMap';
import { Typography } from '@mui/material';

function FavouritePage() {
    return (
        <div className={css.topPallete}>
            <SearchAppBar/>
            <Typography gutterBottom sx={{
                fontWeight:"bold", 
                fontSize: 22,
                maxWidth: '500px',
                margin: 2
            }}>
                Produk Favorit
            </Typography>
            <FavouriteMap/>
            <NavigationBar/>
        </div>
    );
}

export default FavouritePage;