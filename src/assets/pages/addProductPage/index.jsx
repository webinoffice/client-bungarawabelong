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

    const [image,setImage] = useState("http://fakeimg.pl/350x200/");
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
        <div>
            <div>
                <img src={image} alt="" />
            </div>
            <div>
                <label htmlFor="formFile" className='form-label'>put image here</label>
                <input type="file" className='form-control' id="formFile" accept='image/*' onChange={handleUploadChang1} />
                <button onClick={uploadImage} className='button-btn-primary'>submit</button>
            </div>

        </div>
    );
}

export default AddProductPage;