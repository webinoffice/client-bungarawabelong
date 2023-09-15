import * as React from 'react';
import css from "./addProductPage.module.css";
import PageAppBar from '../../components/pageAppBar';
import { Avatar, Typography, IconButton, Button, Divider, TextField } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import { useState } from "react";

const shop = [
    {
        imgPath:
            'https://www.w3schools.com/w3images/avatar2.png',
        shopName: 'Toko Bunga',
        shopAddress: 'Jl. Gamon Gacor',
        shopPhone: "0812292929",
        shopDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        bankName: "BCA",
        bankNum: "7627363726",
    }
]

function AddProductPage() {
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
                display: 'flex',
                margin: '20px',
                justifyContent: 'space-between'
            }}>
                <div style={{display: 'flex'}}>
                    <Avatar alt="Remy Sharp" src={shop[0].imgPath} sx={{
                        height: '100px',
                        width: '100px'
                    }} />
                </div>
                <Button variant="contained" color="primary" style={{
                    width: "50%", height: "40px", marginTop: '30px'
                }}>
                    Ubah Foto
                </Button>
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
                    label="Nama Toko"
                    variant="outlined"
                    defaultValue= {shop[0].shopName}
                />
                <br />
                <TextField
                    style={{ width: "100%", marginBottom: "10px"}}
                    type="number"
                    label="No. Telepon Toko"
                    variant="outlined"
                    defaultValue= {shop[0].shopPhone}
                />
                <br />
                <TextField
                    style={{ width: "100%", marginBottom: "10px"}}
                    type="text"
                    label="Deskripsi Toko"
                    variant="outlined"
                    multiline
                    defaultValue= {shop[0].shopDescription}
                />
                <br />
                <TextField
                    style={{ width: "100%", marginBottom: "10px" }}
                    type="text"
                    label="Alamat Toko"
                    variant="outlined"
                    defaultValue= {shop[0].shopAddress}
                />
                <br />
                <div style={{display:'flex', justifyContent: "space-between"}}>
                    <TextField
                        style={{ width: "40%" }}
                        type="text"
                        label="Nama Bank"
                        variant="outlined"
                        defaultValue= {shop[0].bankName}
                    />
                    <TextField
                        style={{ width: "58%" }}
                        type="text"
                        label="No. Rekening"
                        variant="outlined"
                        defaultValue= {shop[0].bankNum}
                    />
                </div>
                <br />
                <Button variant="contained" color="primary" type='submit' style={{
                    width: "100%", marginBottom: "10px"
                }}>
                    Ubah Profil
                </Button>
                <div style={{height: '50px'}}/>
            </form>
        </div> 
    );
}

export default AddProductPage;