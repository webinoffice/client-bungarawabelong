import * as React from 'react';
import css from './productPage.module.css';
import FavouriteMap from '../../components/favouriteMap';
import { Typography } from '@mui/material';
import SearchAppBar from '../../components/searchAppBar';

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
        </div>
    );
}

export default ProductPage;