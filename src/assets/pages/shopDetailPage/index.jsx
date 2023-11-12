import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { autoPlay } from 'react-swipeable-views-utils';
import css from './shopDetailPage.module.css';
import PageAppBar from '../../components/pageAppBar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ShopMap from '../../components/shopMap';
import ShareIcon from '@mui/icons-material/Share';
import { IconButton } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function ShopDetailPage() {
    const {shop_id} = useParams();
    const [product, setProduct] = useState();
    useEffect(()=>{
        const getProduct = async () => {
            try {
              const response = await axios.get("http://localhost:8081/getshopbyid/" + shop_id);
              setProduct(response.data);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
      
        getProduct();
    },[])
    console.log(product);
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const location = useLocation();
    const [toko, setToko] =  useState([]);
    const [produk, setProduk] =  useState([]);
    const [shopId, setShopId] = useState(location.state);
    const handleStepChange = (step) => {
        setActiveStep(step);
    };
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };
        
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
    
        setOpen(false);
    };


    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    
    if (product) {
        
        return (
        <div className={css.topPallete}>
            <PageAppBar/>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '20px'
            }}>
                <div style={{display:'flex'}}>
                    <Avatar alt="Remy Sharp" src={product.shop_profile} sx={{
                        height: '50px',
                        width: '50px'
                    }} />
                    <Typography gutterBottom color='primary' sx={{
                        fontWeight:"bold", 
                        fontSize: 18,
                        marginBottom: 'auto',
                        marginTop: 'auto',
                        marginLeft: '20px'
                    }}>
                        {product.shop_name}
                    </Typography>
                </div>
                <IconButton onClick={()=>{
                    navigator.clipboard.writeText(
                    "http://localhost:3000/#/shop/" + product.shop_id)
                    handleClick();
                }
                }> 
                    <ShareIcon color='primary'/>
                </IconButton>
            </div>
            <Typography variant="body2" color="text.secondary" sx={{
                marginBottom: '10px',
                marginLeft: '20px',
                marginRight: '20px',
            }}>
                {product.shop_description}
            </Typography>
            <Divider/>
            <div style={{
                display:"flex", 
                marginLeft: '20px', 
                marginRight: '20px', 
                marginTop: '10px', 
                marginBottom: '10px'
            }}>
                <LocationOnIcon sx={{marginRight:'10px'}}/>
                <Typography variant="body2" color="text.secondary" sx={{
                    alignSelf: 'center',
                    fontWeight: 'bold'
                }}>
                    {product.shop_address}
                </Typography>
            </div>
            <div style={{
                display:"flex", 
                marginLeft: '20px', 
                marginRight: '20px', 
                marginTop: '10px', 
                marginBottom: '10px'
            }}>
                <PhoneAndroidIcon sx={{marginRight:'10px'}}/>
                <Typography variant="body2" color="text.secondary" sx={{
                    alignSelf: 'center',
                    fontWeight: 'bold'
                }}>
                    {product.shop_phone}
                </Typography>
            </div>
            {product.shop_banks.map((data,index)=>(
                <div style={{
                    display:"flex", 
                    marginLeft: '20px', 
                    marginRight: '20px', 
                    marginTop: '10px', 
                    marginBottom: '10px'
                }}>
                    <AccountBalanceIcon sx={{marginRight:'10px'}}/>
                    <Typography variant="body2" color="text.secondary" sx={{
                        alignSelf: 'center',
                        fontWeight: 'bold'
                    }}>
                        {data.bank_name} - {data.bank_number}
                    </Typography>
                </div>
            ))}
            <Divider/>
            <Typography gutterBottom sx={{
                    fontWeight:"bold", 
                    fontSize: 16,
                    maxWidth: '500px',
                    margin: 2
                }}>
                    Produk Toko
                </Typography>
            <ShopMap props={product}/>
            
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message={'Tautan toko telah di salin ke clipboard'}
                action={action}
            />
        </div>
      );
    }
}

export default ShopDetailPage;