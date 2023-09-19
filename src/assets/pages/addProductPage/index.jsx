import * as React from 'react';
import css from "./addProductPage.module.css";
import PageAppBar from '../../components/pageAppBar';
import { Avatar, Typography, IconButton, Button, Divider, TextField } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import { useState } from "react";
import { alignProperty } from '@mui/material/styles/cssUtils';
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

    const [image,setImage] = useState("http://fakeimg.pl/500x500/");
    const [saveImage, setSaveImage] = useState(null);
    

        function handleUploadChang1(e){
            console.log(e.target.files[0]);
            let uploaded = e.target.files[0];
            setImage(URL.createObjectURL(uploaded));
            setSaveImage(uploaded);
        }

        function uploadImage() {
            if(!saveImage){
                console.log("gagal bosku");
            }else{
                let formData = new FormData();
                formData.append("photo" , saveImage)

                fetch("http://localhost:8081/uploads" , {
                    method: "POST",
                    body: formData,
                }).then((res) => res.json()).then(data => {
                    if(data.status === 'sukses'){
                        window.location.href = data.image;
                    }else{
                        console.log(data.status);
                    }
                })
            }
        }

        

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
                    aspectRatio: '1/1'
                }}/>
            </div>
            <div>
                <label htmlFor="formFile" className='form-label'>put image here</label>
                <input type="file" className='form-control' id="formFile" accept='image/*' onChange={handleUploadChang1} />
                <button onClick={uploadImage} className='button-btn-primary'>submit</button>
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
                />
                <br />
                <TextField
                    style={{ width: "100%", marginBottom: "10px"}}
                    type="text"
                    label="Deskripsi Produk"
                    variant="outlined"
                    multiline
                    minRows={2}
                />
                <br />
                <div style={{display:'flex', justifyContent: "space-between"}}>
                    <TextField
                        style={{ width: "44%" }}
                        type="text"
                        label="Kisaran Harga"
                        variant="outlined"
                    />
                    <span sty>-</span>
                    <TextField
                        style={{ width: "44%" }}
                        type="text"
                        label="Kisaran Harga"
                        variant="outlined"
                    />
                </div>
                <br />
                <Button variant="contained" color="primary" type='submit' style={{
                    width: "100%", marginBottom: "10px"
                }}>
                    Upload Produk
                </Button>
                <div style={{height: '50px'}}/>
            </form>
        </div>
    );
}

export default AddProductPage;