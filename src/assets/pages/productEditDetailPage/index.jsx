import * as React from 'react';
import css from "./productEditDetailPage.module.css";
import PageAppBar from '../../components/pageAppBar';
import { Avatar, Typography, IconButton, Button, Divider, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useLocation } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function ProductEditDetailPage() {
    const location = useLocation();
    const [image, setImage] = useState(location.state.product_image);
    const [oldImage, setOldImage] = useState(location.state.product_image);
    const [saveImage, setSaveImage] = useState(null);

    const [nama, setNama] = useState(location.state.product_name);
    const [harga1, setHarga1] = useState(location.state.product_price);
    const [tipe,setTipe] = useState(location.state.product_type);
    const [deskripsi, setDeskripsi] = useState(location.state.product_description);
    const navigate = useNavigate();

    function handleUploadChange(e){
        const uploaded = e.target.files[0];
        setImage(URL.createObjectURL(uploaded));
        setSaveImage(uploaded);
    }
    const handleChange = (event) => {
        setTipe(event.target.value);
    };

    const updateNonPic = async () => {
        try {
            await axios.post("http://localhost:8081/updateproductwithoutpic", {
                product_name: nama,
                product_price: harga1,
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
            formData.append("product_price", harga1);
            formData.append("product_type", tipe);
            formData.append("product_description", deskripsi);
            formData.append("product_id", location.state.product_id);
            formData.append("product_image", saveImage);
            formData.append("oldImage", oldImage.split("/").pop());
            
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
            {location.state.product_status === 'Aktif' ? (
                <Typography gutterBottom sx={{
                    fontWeight:"bold", 
                    fontSize: 22,
                    maxWidth: '500px',
                    margin: 2
                }}>
                    Edit {location.state.product_name}
                </Typography>
            ):(
                <Typography gutterBottom sx={{
                    fontWeight:"bold", 
                    fontSize: 22,
                    maxWidth: '500px',
                    margin: 2,
                    color: 'red',
                }}>
                    Edit {location.state.product_name}
                </Typography>
            )}
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
            <div style={{
                display: 'flex', 
                justifyContent: 'space-between',
                marginLeft: '20px',
                marginRight: '20px'
            }}>
                <Typography sx={{
                    marginTop: '10px',
                    fontSize: '14px'
                }}>
                    Status Produk: {location.state.product_status}
                </Typography>
                {location.state.product_status === 'Aktif' ? (
                    <Button variant="contained" color="merah" component="span" onClick={() => {
                        axios.post(
                        "http://localhost:8081/productstatus/", {
                            product_id: location.state.product_id,
                            product_status: location.state.product_status,
                        }
                    );
                    navigate(-1);
                    }} style={{
                        height: '23px',
                        marginTop: "10px",
                        marginBottom: "10px",
                        fontSize: '12px',
                        color: 'white'
                    }}>
                        Nonaktifkan Produk
                    </Button>
                ):(
                    <Button variant="contained" color="primary" component="span" onClick={() => {
                        axios.post(
                        "http://localhost:8081/productstatus/", {
                            product_id: location.state.product_id,
                            product_status: location.state.product_status,
                        }
                    );
                    navigate(-1);
                    }} style={{
                        height: '23px',
                        marginTop: "10px",
                        marginBottom: "10px",
                        fontSize: '12px',
                    }}>
                        Aktifkan Produk
                    </Button>
                )}
            </div>
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
                <TextField
                    style={{ width: "100%", marginBottom: "10px"}}
                    type="text"
                    label="Harga Produk"
                    variant="outlined"
                    multiline
                    minRows={1}
                    defaultValue={location.state.product_price}
                    onChange={e => setHarga1(e.target.value)}
                />
                <br />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Tipe Bunga</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={tipe}
                            label="Tipe Bunga"
                            onChange={handleChange}
                        >
                        <MenuItem value={'Bucket Bunga'}>Bucket Bunga</MenuItem>
                        <MenuItem value={'Bunga Papan'}>Bunga Papan</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" type='submit' style={{
                    width: "100%", marginBottom: "10px" , marginTop: '10px'
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