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
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import ShopMap from '../../components/shopMap';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function ShopDetailPage() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const location = useLocation();
    const [toko, setToko] =  useState([]);
    const [produk, setProduk] =  useState([]);
    const [shopId, setShopId] = useState(location.state);
    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
    <div className={css.topPallete}>
        <PageAppBar/>
        <div style={{
            display: 'flex',
            margin: '20px',
            justifyContent: 'space-between'
        }}>
            <div style={{display: 'flex'}}>
                <Avatar alt="Remy Sharp" src={location.state.shop.shop_profile} sx={{
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
                    {location.state.shop.shop_name}
                </Typography>
            </div>
        </div>
        <Typography variant="body2" color="text.secondary" sx={{
            marginBottom: '10px',
            marginLeft: '20px',
            marginRight: '20px',
        }}>
            {location.state.shop.shop_description}
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
                {location.state.shop.shop_address}
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
                {location.state.shop.shop_phone}
            </Typography>
        </div>
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
                {location.state.shop.shop_bankname} - {location.state.shop.shop_banknum}
            </Typography>
        </div>
        <Divider/>
        <Typography gutterBottom sx={{
                fontWeight:"bold", 
                fontSize: 16,
                maxWidth: '500px',
                margin: 2
            }}>
                Produk Toko
            </Typography>
        <ShopMap props={location.state}/>
    </div>
  );
}

export default ShopDetailPage;