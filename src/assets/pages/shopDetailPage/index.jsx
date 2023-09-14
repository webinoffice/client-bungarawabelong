import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { autoPlay } from 'react-swipeable-views-utils';
import css from './shopDetailPage.module.css';
import PageAppBar from '../../components/pageAppBar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Divider from '@mui/material/Divider';
import { TextField, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavouriteMap from '../../components/favouriteMap';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const index = 1;
const images = [
  {
    label: 'Dummy 1',
    price: '100000',
    price2: '150000',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
];
const shop = [
    {
        imgPath:
            'https://www.w3schools.com/w3images/avatar2.png',
        shopName: 'Toko Bunga',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    }
]

function ShopDetailPage() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

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
                <Avatar alt="Remy Sharp" src={shop[0].imgPath} sx={{
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
                    {shop[0].shopName}
                </Typography>
            </div>
        </div>
        <Typography variant="body2" color="text.secondary" sx={{
            marginBottom: '10px',
            marginLeft: '20px',
            marginRight: '20px',
        }}>
            {shop[0].description}
        </Typography>
        <Divider/>
        <Typography gutterBottom sx={{
                fontWeight:"bold", 
                fontSize: 16,
                maxWidth: '500px',
                margin: 2
            }}>
                Produk Toko
            </Typography>
        <FavouriteMap/>
    </div>
  );
}

export default ShopDetailPage;