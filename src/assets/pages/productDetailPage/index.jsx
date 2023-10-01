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
import { useLocation, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

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
    const navigate = useNavigate();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const location = useLocation();
  console.log(location);
//   const {para} = state;
//   console.log(para);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const [no,setNo] = useState('')
  const [desc,setDesc] = useState('')
  const [namap,setNamap] = useState(location.state.para.nama)
  const [id,setId] = useState(location.state.para.shopid)
  const [nama,setNama] = useState('')

  const handleSubmit = async (e) => {
    try {
        e.preventDefault();
        const response = await axios.post('http://localhost:8081/createtransaction', {
            product_id: location.state.para.product_id,
            transaction_description: desc,
            transaction_name: nama,
            transaction_phonenum: no
        });
        handleClick();
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
    }

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
    
        setOpen(false);
        navigate('/');
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

  return (
    <div className={css.topPallete}>
      <PageAppBar />
      <Box sx={{ maxWidth: 1, flexGrow: 1 }}>
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          <div key={images.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  aspectRatio: 1 / 1,
                  display: "block",
                  maxWidth: 1,
                  overflow: "hidden",
                  width: "100%",
                  objectFit: "cover",
                }}
                src={location.state.para.product_image}
                alt={location.state.para.img}
              />
            ) : null}
          </div>
        </AutoPlaySwipeableViews>
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px",
          marginTop: "10px",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        <Typography
          gutterBottom
          color="primary"
          sx={{
            fontWeight: "bold",
            fontSize: 22,
            marginBottom: "auto",
            marginTop: "auto",
          }}
        >
          {location.state.para.product_name}
        </Typography>
        <IconButton>
          <StarBorderIcon color="primary" />
        </IconButton>
      </div>
      <Typography
        gutterBottom
        color="error"
        sx={{
          fontWeight: "bold",
          fontSize: 18,
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        Harga Berkisar di Rp. {location.state.para.product_price_1} -{" "}
        {location.state.para.product_price_2}
      </Typography>
      <Divider />
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          marginTop: "10px",
          marginBottom: "10px",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        {location.state.para.product_description}
      </Typography>
      <Divider />

      <div
        style={{
          display: "flex",
          margin: "20px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex" }}>
          <Avatar
            alt="Remy Sharp"
            src={shop[0].imgPath}
            sx={{
              height: "50px",
              width: "50px",
            }}
          />
          <Typography
            gutterBottom
            color="primary"
            sx={{
              fontWeight: "bold",
              fontSize: 18,
              marginBottom: "auto",
              marginTop: "auto",
              marginLeft: "20px",
            }}
          >
            {location.state.para.shop.shop_name}
          </Typography>
        </div>
        <IconButton
          onClick={() =>
            navigate("/shop", { state: location.state.para })
          }
        >
          <ArrowForwardIcon color="primary"></ArrowForwardIcon>
        </IconButton>
      </div>

      <Divider />
      <Typography
        gutterBottom
        color="primary"
        sx={{
          fontWeight: "bold",
          fontSize: 18,
          marginBottom: "auto",
          marginTop: "10px",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        Form Pemesanan
      </Typography>
      <form
        style={{
          marginBottom: "auto",
          marginTop: "10px",
          marginLeft: "20px",
          marginRight: "20px",
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          style={{ width: "100%", marginBottom: "10px" }}
          type="text"
          label="Nama"
          variant="outlined"
          onChange={(e) => setNama(e.target.value)}
        />
        <br />
        <TextField
          style={{ width: "100%", marginBottom: "10px" }}
          type="text"
          label="No. Telepon"
          variant="outlined"
          onChange={(e) => setNo(e.target.value)}
        />
        <TextField
          style={{ width: "100%", marginBottom: "20px" }}
          type="text"
          label="Deskripsi"
          variant="outlined"
          onChange={(e) => setDesc(e.target.value)}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{
            width: "100%",
            marginBottom: "10px",
          }}
        >
          Pesan Sekarang
        </Button>
        <div style={{ height: "50px" }} />
      </form>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Pesananmu telah dikirim ke penjual. Penjual akan segera menghubungimu"
        action={action}
      />
    </div>
  );
}

export default ProductDetailPage;