import * as React from 'react';
import css from './productPage.module.css';
import NavigationBar from '../../components/navigationBar';
import SearchAppBar from '../../components/searchAppBar';
import FavouriteMap from '../../components/favouriteMap';
import { Typography } from '@mui/material';

function ProductPage() {
    return (
        <div className={css.topPallete}>
            <SearchAppBar/>
            <Typography gutterBottom sx={{
                fontWeight:"bold", 
                fontSize: 22,
                maxWidth: '500px',
                margin: 2
            }}>
                Daftar Produk
            </Typography>
            <FavouriteMap/>
            <NavigationBar/>
        </div>
    );
}

export default ProductPage;