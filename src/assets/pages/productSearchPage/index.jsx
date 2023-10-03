import * as React from 'react';
import css from './productSearchPage.module.css';
import { Typography } from '@mui/material';
import SearchAppBar from '../../components/searchAppBar';
import ProductSearchMap from '../../components/productSearchMap';
import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';

function ProductSearchPage() {
    const [productSearch, setProductSearch] = useState([]);
    const {search} = useParams();
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
            <ProductSearchMap location={location.state}/>
        </div>
    );
}

export default ProductSearchPage;