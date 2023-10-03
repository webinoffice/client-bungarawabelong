import * as React from 'react';
import css from './productEditPage.module.css';
import { Typography } from '@mui/material';
import PageAppBar from '../../components/pageAppBar';
import ProductEditMap from '../../components/productEditMap';
import { useLocation } from 'react-router-dom';

function ProductEditPage() {
    const location = useLocation();
    console.log(location.state);
    return (
        <div className={css.topPallete}>
            <PageAppBar/>
            <Typography gutterBottom sx={{
                fontWeight:"bold", 
                fontSize: 22,
                maxWidth: '500px',
                margin: 2
            }}>
                Edit Produk
            </Typography>
            <ProductEditMap props={location.state}/>
        </div>
    );
}

export default ProductEditPage;