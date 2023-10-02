import * as React from 'react';
import css from "./addProductPage.module.css";
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

function AddProductPage() {
    const location = useLocation();
    console.log(location.state);
    const [image, setImage] = useState("http://fakeimg.pl/500x500/");
    const [saveImage, setSaveImage] = useState(null);
    const [nama, setNama] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [harga1, setHarga1] = useState("");
    const [harga2, setHarga2] = useState("");
    const navigate = useNavigate();

    function handleUploadChange(e){
        const uploaded = e.target.files[0];
        setImage(URL.createObjectURL(uploaded));
        setSaveImage(uploaded);
    }

    function uploadImage() {
        if(!saveImage){
            console.log("Upload gambar gagal");
        } else{
            const formData = new FormData();
            formData.append("product_name", nama);
            formData.append("product_price_1", harga1);
            formData.append("product_price_2", harga2);
            formData.append("product_type", "Bucket Bunga");
            formData.append("product_description", deskripsi);
            formData.append("shop_id", location.state);
            formData.append("product_image", saveImage);

            axios
              .post("http://localhost:8081/createproduct", formData, {
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
              handleClick();
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
                Tambah Produk
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
                        Upload Gambar
                    </Button>
                </label> 
            </div>
            <Divider/>
            <form style={{
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
                    onChange={e => setDeskripsi(e.target.value)}
                />
                <br />
                <div style={{display:'flex', justifyContent: "space-between"}}>
                    <TextField
                        style={{ width: "44%" }}
                        type="text"
                        label="Kisaran Harga"
                        variant="outlined"
                        onChange={e => setHarga1(e.target.value)}
                    />
                    <span sty>-</span>
                    <TextField
                        style={{ width: "44%" }}
                        type="text"
                        label="Kisaran Harga"
                        variant="outlined"
                        onChange={e => setHarga2(e.target.value)}
                    />
                </div>
                <br />
                <Button variant="contained" color="primary" onClick={() => uploadImage()} type='submit' style={{
                    width: "100%", marginBottom: "10px" 
                }}>
                    Upload Produk
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

export default AddProductPage;