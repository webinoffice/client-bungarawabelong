import * as React from 'react';
import css from "./profilePage.module.css";
import PageAppBar from '../../components/pageAppBar';
import { Avatar, Typography, IconButton, Button, Divider, TextField, Snackbar } from '@mui/material';
import axios from 'axios';
import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import CloseIcon from "@mui/icons-material/Close";
import BankMap from '../../components/bankMap';
import BankAdd from '../../components/bankAdd';
import {API} from '../../config/api.js';


function ProfilePage() {
    const navigate =useNavigate();
    const [update_profile, setUpdate_profile] = useState(null);
    const [shop_id, setShop_id] = useState("");
    const [shop_name, setShop_name] = useState("");
    const [shop_phone, setShop_phone] = useState("");
    const [shop_description, setShop_description] = useState("");
    const [shop_address, setShop_address] = useState("");
    const [shop_profile, setShop_profile] = useState(null);
    const [oldImage, setOldImage] = useState("");
    const [banks, setBanks] = useState([]);

    const refreshToken = async () => {
      try {
        const response = await API.get("refreshtoken");
        const decoded = jwt_decode(response.data.accessToken);
        setShop_id(decoded.shop_id);
        setShop_name(decoded.shop_name);
        setShop_phone(decoded.shop_phone);
        setShop_description(decoded.shop_description);
        setShop_address(decoded.shop_address);
        setShop_profile(decoded.shop_profile);
        setOldImage(decoded.shop_profile);
        setBanks(decoded.shop_bank);
        console.log(decoded);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    React.useEffect(() => {
      refreshToken();
    }, []);

    function uploadImage (e) {
      e.preventDefault();
      handleClick();
        if(!update_profile) {
            API
              .post("updateshopwithoutpic", {
                shop_id: shop_id,
                shop_name: shop_name,
                shop_description: shop_description,
                shop_address: shop_address,
                shop_phone: shop_phone,
              }, {

              })
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });

        } else {
            const formData = new FormData();
            formData.append("shop_name", shop_name);
            formData.append("shop_description", shop_description);
            formData.append("shop_address", shop_address);
            formData.append("shop_profile", update_profile);
            formData.append("shop_phone", shop_phone);
            formData.append("shop_id", shop_id);
            formData.append("oldImage", oldImage.split("/").pop());

            API
              .post("updateshop", formData, {
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

    const handleClick = () => {
      setOpen(true);
    };

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }

      setOpen(false);
      navigate("/settings");
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

    function handleUploadChange(e) {
        const uploaded = e.target.files[0];
        setShop_profile(URL.createObjectURL(uploaded));
        setUpdate_profile(uploaded);
    }

    return (
      <div className={css.topPallete}>
        <PageAppBar />
        <Typography
          gutterBottom
          sx={{
            fontWeight: "bold",
            fontSize: 22,
            maxWidth: "500px",
            margin: 2,
          }}
        >
          Profil Toko
        </Typography>
        <div
          style={{
            display: "flex",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", marginLeft: "20px" }}>
            <Avatar
              alt="Remy Sharp"
              src={shop_profile}
              sx={{
                height: "100px",
                width: "100px",
              }}
            />
          </div>
          <div style={{ 
            display: "flex",
            margin: 0,
            padding: 0,
          }}>
            <input
              accept="image/*"
              style={{ 
                display: "none",
                margin: 0,
                padding: 0,
              }}
              id="raised-button-file"
              type="file"
              onChange={handleUploadChange}
            />
            <label htmlFor="raised-button-file" style={{
              margin: 0,
              padding: 0,
            }}>
              <Button
                variant="contained"
                color="primary"
                component="span"
                style={{
                  width: "140px",
                  marginTop: "30px",
                  marginLeft: "20px",
                }}
              >
                Ubah Gambar
              </Button>
            </label>
          </div>
        </div>
        <Divider />
        <form onSubmit={uploadImage}
          style={{
            marginBottom: "auto",
            marginTop: "10px",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <TextField
            style={{ width: "100%", marginBottom: "10px", marginTop: "10px" }}
            type="text"
            label="Nama Toko"
            variant="outlined"
            onChange={(e) => setShop_name(e.target.value)}
            value={shop_name}
          />
          <br />
          <TextField
            style={{ width: "100%", marginBottom: "10px" }}
            type="number"
            label="No. Telepon Toko"
            variant="outlined"
            onChange={(e) => setShop_phone(e.target.value)}
            value={shop_phone}
          />
          <br />
          <TextField
            style={{ width: "100%", marginBottom: "10px" }}
            type="text"
            label="Deskripsi Toko"
            variant="outlined"
            multiline
            minRows={2}
            onChange={(e) => setShop_description(e.target.value)}
            value={shop_description}
          />
          <br />
          <TextField
            style={{ width: "100%", }}
            type="text"
            label="Alamat Toko"
            variant="outlined"
            onChange={(e) => setShop_address(e.target.value)}
            value={shop_address}
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{
              width: "100%",
              marginBottom: "20px",
            }}
          >
            Ubah Profil
          </Button>
        </form>
        <Divider />
        <div style={{
            marginLeft: '20px',
            marginRight: '20px',
        }}>
          {banks.length === 0 ? (
            <BankAdd para={shop_id}/>
          ) : (
            banks.map((data,index)=>(
              <BankMap para={data}/>
            ))
          )}

          {banks.length !== 0 && banks.length < 3 ? (
            <BankAdd para={shop_id}/>
          ) : ("")}
        </div>
        <div style={{ height: "50px" }} />
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

export default ProfilePage;