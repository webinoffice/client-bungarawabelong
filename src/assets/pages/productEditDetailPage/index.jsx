import * as React from 'react';
import css from "./productEditDetailPage.module.css";
import PageAppBar from '../../components/pageAppBar';
import { Avatar, Typography, IconButton, Button, Divider, TextField } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import { useState } from "react";
import { alignProperty } from '@mui/material/styles/cssUtils';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useLocation } from 'react-router-dom';
// import { use } from '../../../../../server/routes/login';

// const shop = [
//     {
//         imgPath:
//             'https://www.w3schools.com/w3images/avatar2.png',
//         shopName: 'Toko Bunga',
//         shopAddress: 'Jl. Gamon Gacor',
//         shopPhone: "0812292929",
//         shopDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
//         bankName: "BCA",
//         bankNum: "7627363726",
//     }
// ]

function ProductEditDetailPage() {
    const location = useLocation();
    console.log(location.state);
    const [image, setImage] = useState(location.state.product_image);
    const [saveImage, setSaveImage] = useState(null);

    const [nama, setNama] = useState(location.state.product_name);
    const [harga1, setHarga1] = useState(location.state.product_price_1);
    const [harga2, setHarga2] = useState(location.state.product_price_2);
    const [tipe,setTipe] = useState(location.state.product_type);
    const [deskripsi, setDeskripsi] = useState(location.state.product_description);
    const navigate = useNavigate();

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    function handleUploadChange(e){
        const uploaded = e.target.files[0];
        setImage(URL.createObjectURL(uploaded));
        setSaveImage(uploaded);
    }

    const updateNonPic = async () => {
        // await delay(1000);
        try {
            await axios.post("http://localhost:8081/updateproductwithoutpic", {
                product_name: nama,
                product_price_1: harga1,
                product_price_2: harga2,
                product_type: tipe,
                product_description: deskripsi,
                product_id: location.state.product_id,
            })
        } catch (error) {
          console.log(error);
        }
    }

    function uploadImage(e) {
        e.preventDefault();
        if(!saveImage){
            handleClick();
            updateNonPic();
        } else{
            handleClick();
            const formData = new FormData();
            formData.append("product_name", nama);
            formData.append("product_price_1", harga1);
            formData.append("product_price_2", harga2);
            formData.append("product_type", tipe);
            formData.append("product_description", deskripsi);
            formData.append("product_id", location.state.product_id);
            formData.append("product_image", saveImage);
            
            axios
            .post("http://localhost:8081/updateproduct", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    const [open, setOpen] = React.useState(false);

    const handleClick = async() => {
        setOpen(true);
    };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
    
        setOpen(false);
        navigate("/settings")
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
            <PageAppBar/>
            <Typography gutterBottom sx={{
                fontWeight:"bold", 
                fontSize: 22,
                maxWidth: '500px',
                margin: 2
            }}>
                Edit {location.state.product_name}
            </Typography>
            <div style={{
                width: '100%'
            }}>
                <img src={image} alt="" style={{
                    width: '100%',
                    aspectRatio: '1/1',
                    objectFit: 'cover'
                }}/>
            </div>
            <div style={{
                // width: '100%',
                marginLeft: '20px',
                marginRight: '20px'
            }}>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    onChange={handleUploadChange}
                />
                <label htmlFor="raised-button-file">
                    <Button variant="contained" color="primary" component="span" style={{
                        width: "100%", 
                        marginTop: "10px",
                        marginBottom: "10px",
                    }}>
                        Ubah Gambar
                    </Button>
                </label> 
            </div>
            <Divider/>
            <form onSubmit={uploadImage} style={{
                marginBottom: 'auto',
                marginTop: '10px',
                marginLeft: '20px',
                marginRight: '20px',
            }}>
                <TextField
                    style={{ width: "100%", marginBottom: "10px", marginTop: "10px"}}
                    type="text"
                    label="Nama Produk"
                    variant="outlined"
                    defaultValue={location.state.product_name}
                    onChange={e => setNama(e.target.value)}
                />
                <br />
                <TextField
                    style={{ width: "100%", marginBottom: "10px"}}
                    type="text"
                    label="Deskripsi Produk"
                    variant="outlined"
                    multiline
                    minRows={2}
                    defaultValue={location.state.product_description}
                    onChange={e => setDeskripsi(e.target.value)}
                />
                <br />
                <div style={{display:'flex', justifyContent: "space-between"}}>
                    <TextField
                        style={{ width: "44%" }}
                        type="text"
                        label="Kisaran Harga"
                        variant="outlined"
                        defaultValue={location.state.product_price_1}
                        onChange={e => setHarga1(e.target.value)}
                    />
                    <span sty>-</span>
                    <TextField
                        style={{ width: "44%" }}
                        type="text"
                        label="Kisaran Harga"
                        variant="outlined"
                        defaultValue={location.state.product_price_2}
                        onChange={e => setHarga2(e.target.value)}
                    />
                </div>
                <br />
                <Button variant="contained" color="primary" type='submit' style={{
                    width: "100%", marginBottom: "10px" 
                }}>
                    Perbarui Produk
                </Button>
                <div style={{height: '50px'}}/>
            </form>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Sukses"
                action={action}
            />
        </div>
    );
}

export default ProductEditDetailPage;