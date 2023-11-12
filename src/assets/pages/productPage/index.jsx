import * as React from 'react';
import css from './productPage.module.css';
import { Typography } from '@mui/material';
import SearchAppBar from '../../components/searchAppBar';
import ProductMap from '../../components/productMap';
import { useLocation } from 'react-router-dom';

function ProductPage() {
    const location = useLocation();
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
            <ProductMap para={location.state}/>
        </div>
    );
}

export default ProductPage;