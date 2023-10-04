import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { autoPlay } from 'react-swipeable-views-utils';
import css from './productSharePage.module.css';
import PageAppBar from '../../components/pageAppBar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Divider from '@mui/material/Divider';
import { TextField, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const index = 1;

function ProductSharePage() {
    const {product_id} = useParams();
    const [product, setProduct] = React.useState([]);
    const navigate = useNavigate();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    const [no,setNo] = useState('')
    const [desc,setDesc] = useState('')
    const [nama,setNama] = useState('')

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:8081/createtransaction', {
                product_id: product[0].product_id,
                transaction_description: desc,
                transaction_name: nama,
                transaction_phonenum: no
            });
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
        navigate('/land');
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

    useEffect(()=>{
        const getProduct = async () => {
            try {
              const response = await axios.get("http://localhost:8081/productbyproductid/" + product_id);
              setProduct(response.data);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
      
        getProduct();
    },[product_id])

  return (product.length>0?
    
    (<div className={css.topPallete}>
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
                src={product[0].product_image}
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
          {product[0].product_name}
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
        Harga Berkisar di Rp. {product[0].product_price_1} -{" "}
        {product[0].product_price_2}
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
        {product[0].product_description}
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
            src={product[0].shop.shop_profile}
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
            {product[0].shop.shop_name}
          </Typography>
        </div>
        <IconButton
          onClick={() =>
            navigate("/shop", { state: null })
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
    </div>):""
  );
}

export default ProductSharePage;