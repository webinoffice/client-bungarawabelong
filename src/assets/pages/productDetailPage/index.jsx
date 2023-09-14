import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { autoPlay } from 'react-swipeable-views-utils';
import css from './productDetailPage.module.css';
import PageAppBar from '../../components/pageAppBar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Divider from '@mui/material/Divider';
import { TextField, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
    }
]

function ProductDetailPage() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={css.topPallete}>
        <PageAppBar/>
        <Box sx={{ maxWidth: 1, flexGrow: 1 }}>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                <div key={images.label}>
                {Math.abs(activeStep - index) <= 2 ? (
                    <Box
                    component="img"
                    sx={{
                        aspectRatio: 1/1,
                        display: 'block',
                        maxWidth: 1,
                        overflow: 'hidden',
                        width: '100%',
                        objectFit: 'cover',
                    }}
                    src={images[0].imgPath}
                    alt={images[0].label}
                    />
                ) : null}
                </div>
            </AutoPlaySwipeableViews>
        </Box>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '20px',
            marginTop: '10px',
            marginBottom: '10px',
            textAlign: 'center',
        }}>
            <Typography gutterBottom color='primary' sx={{
                fontWeight:"bold", 
                fontSize: 22,
                marginBottom: 'auto',
                marginTop: 'auto',
            }}>
                {images[0].label}
            </Typography>
            <IconButton>
                <StarBorderIcon color='primary'/>
            </IconButton>
        </div>
        <Typography gutterBottom color='error' sx={{
            fontWeight:"bold", 
            fontSize: 18,
            marginLeft: '20px',
            marginRight: '20px',
        }}>
            Harga Berkisar di Rp. {images[0].price} - {images[0].price2}
        </Typography>
        <Divider/>
        <Typography variant="body2" color="text.secondary" sx={{
            marginTop: '10px',
            marginBottom: '10px',
            marginLeft: '20px',
            marginRight: '20px',
        }}>
            {images[0].description}
        </Typography>
        <Divider/>

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
            <IconButton>
                <ArrowForwardIcon color='primary'></ArrowForwardIcon>
            </IconButton>
        </div>


        <Divider/>
        <Typography gutterBottom color='primary' sx={{
            fontWeight:"bold", 
            fontSize: 18,
            marginBottom: 'auto',
            marginTop: '10px',
            marginLeft: '20px',
            marginRight: '20px',
        }}>
            Form Pemesanan
        </Typography>
        <form style={{
            marginBottom: 'auto',
            marginTop: '10px',
            marginLeft: '20px',
            marginRight: '20px',
        }}>
            <TextField
                style={{ width: "100%", marginBottom: "10px"}}
                type="text"
                label="Nama"
                variant="outlined"
            />
            <br />
            <TextField
                style={{ width: "100%", marginBottom: "20px" }}
                type="text"
                label="No. Telepon"
                variant="outlined"
            />
            <br />
            <Button variant="contained" color="primary" style={{
                width: "100%", marginBottom: "10px"
            }}>
                Pesan Sekarang
            </Button>
            <div style={{height: '50px'}}/>
        </form>
    </div>
  );
}

export default ProductDetailPage;