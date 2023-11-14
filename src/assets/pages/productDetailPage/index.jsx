import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { autoPlay } from 'react-swipeable-views-utils';
import css from './productDetailPage.module.css';
import PageAppBar from '../../components/pageAppBar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Divider from '@mui/material/Divider';
import { TextField, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState,useEffect, useRef } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import Cookies from 'js-cookie';
import {API} from '../../config/api.js';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const index = 1;

function ProductDetailPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const location = useLocation();
  const [message, setMessage] = React.useState('');

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
      const response = await API.post('createtransaction', {
        product_id: location.state.para.product_id,
        transaction_description: desc,
        transaction_name: nama,
        transaction_phonenum: no
      });
      setMessage('Pesananmu telah dikirim ke penjual. Penjual akan segera menghubungimu');
      handleClick();
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
      if (message === 'Tautan produk telah di salin ke clipboard'){
      }else{
        navigate('/land');
      }
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

  const cookieAdd = (newObject) => {
    const existingArray = Cookies.getJSON('myArray') || [];
  
    existingArray.push(newObject);
  
    Cookies.set('myArray', existingArray);
    setArrayInCookie(true);
  }

  const cookieDelete = (objectToDelete) => {
    const existingArray = Cookies.getJSON('myArray') || [];
  
    const indexToDelete = existingArray.findIndex(
      (item) => item.product_id === objectToDelete.product_id
    );
  
    if (indexToDelete !== -1) {
      existingArray.splice(indexToDelete, 1);
      Cookies.set('myArray', existingArray);
      setArrayInCookie(false);
    }
  }
  const [arrayInCookie, setArrayInCookie] = useState(false);
  useEffect(() => {
    const existingArray = Cookies.getJSON('myArray') || [];
    if (existingArray.findIndex(
      (item) => item.product_id === location.state.para.product_id
    ) > -1) {
      return setArrayInCookie(true);
    } else {
      return setArrayInCookie(false);
    }
  }, []);

  function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID").format(number);
  }

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
          <div>
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
          marginBottom: "2px",
        }}
      >
        <Typography
          gutterBottom
          color="primary"
          sx={{
            fontWeight: "bold",
            fontSize: 20,
            marginBottom: "auto",
            marginTop: "auto",
            width: '60%',
          }}
        >
          {location.state.para.product_name}
        </Typography>
        <div>
          <IconButton onClick={()=>{
            navigator.clipboard.writeText(
              "http://localhost:3000/#/share-detail/" + location.state.para.product_id)
            setMessage('Tautan produk telah di salin ke clipboard')
            handleClick();
          }
          }> 
            <ShareIcon color='primary'/>
          </IconButton>
          
          {!arrayInCookie ? (
            <IconButton 
              onClick={()=>cookieAdd(location.state.para)}
            >
              <FavoriteBorderIcon color="primary" />
            </IconButton>
          ) : (
            <IconButton 
              onClick={()=>cookieDelete(location.state.para)}
            >
              <FavoriteIcon color="pink" />
            </IconButton>
          )}
        </div>
      </div>
      <Typography
        gutterBottom
        color="error"
        sx={{
          fontWeight: "bold",
          fontSize: 16,
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        Rp. {formatRupiah(location.state.para.product_price)}
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
            src={location.state.para.shop.shop_profile}
            sx={{
              height: "50px",
              width: "50px",
              margin: 'auto'
            }}
          />
          <div>
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
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                marginLeft: "20px",
                marginRight: "20px",
              }}
            >
              No WhatsApp: {location.state.para.shop.shop_phone}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                marginLeft: "20px",
                marginRight: "20px",
              }}
            >
              {location.state.para.shop.shop_bankname} - {location.state.para.shop.shop_banknum}
            </Typography>
          </div>
        </div>
        <IconButton
          onClick={() =>
            navigate("/shop/"+location.state.para.shop_id, { state: location.state.para })
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
        message={message}
        action={action}
      />
    </div>
  );
}

export default ProductDetailPage;