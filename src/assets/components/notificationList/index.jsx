import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import {API} from '../../config/api.js';

export default function NotificationList() {
  const [saveImage, setSaveImage] = useState(null);
  const [image, setImage] = useState(null);
  const location = useLocation();
  const [transaksi, setTransaksi] = useState([]);
  const navigate = useNavigate();
  // const currentDate = new Date();
  // // const salesDate = new Date(location.state.sales_date);
  // const timeDifference = currentDate - salesDate;
  // const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  // const maxDays = 14;

  useEffect(() => {
    const grabHandler = async () => {
      try {
        const response = await API.get("gettransactionbyshopid/" + location.state);
        setTransaksi(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    grabHandler();
  }, []);

  function handleUploadChange(e) {
    const uploaded = e.target.files[0];
    setImage(URL.createObjectURL(uploaded));
    setSaveImage(uploaded);
  }


  function uploadImage(id) {
    if (!saveImage) {
      console.log("Upload gambar gagal");
    } else {
      const formData = new FormData();
      formData.append("transaction_id", id);
      formData.append("transaction_proof", saveImage);
    
      API
      .post("updatetransaction", formData, {
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
      window.location.reload();
    }
  }

  const steps = [
    'Pesanan dikemas',
    'Pesanan dikirim',
    'Pesanan selesai',
  ];

  return (
    <div>
      {transaksi.map((data, index) => (
        <Card sx={{ maxWidth: "100%", marginBottom: "10px" }}>
          <Typography
            gutterBottom
            color="primary"
            sx={{
              fontWeight: "bold",
              fontSize: 20,
              margin: "10px 20px 0px 20px",
            }}
          >
            {data.product.product_name}
          </Typography>
          <Typography
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: 18,
              margin: "0px 20px 0px 20px",
            }}
          >
            Pemesan: {data.transaction_name}, {data.transaction_phonenum}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              margin: "0px 20px 0px 20px",
            }}
          >
            {data.transaction_date}, {data.transaction_time}
          </Typography>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{
              margin: "10px 20px 0px 20px",
            }}
          >
            Pesan: {data.transaction_description}
          </Typography>
          {data.transaction_status === "Completed" ? (
            <div style={
              {margin: '10px 20px 0px 20px',}
            }>
              <Stepper activeStep={2} alternativeLabel sx={{
                margin: '0px 0px 10px 0px'
              }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
                <Button variant='contained' color='error' fullWidth style={{
                  color: 'white',
                }} onClick={()=>window.location.href = data.transaction_proof}>
                  Lihat Bukti Pembayaran
                </Button>

              </div>
            </div>
          ) : (
            ""
          )}
          {data.transaction_status === "Dikirim" ? (
            <div style={
              {margin: '10px 20px 0px 20px',}
            }>
              <Stepper activeStep={1} alternativeLabel sx={{
                margin: '0px 0px 10px 0px'
              }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                height: '50px'
              }}>
                <Button variant='contained' color='error' style={{
                  color: 'white',
                  width: '49%'
                }} onClick={()=>{
                  API.post('updatetrans', {
                    transaction_status: 'Completed',
                    transaction_id: data.transaction_id,
                  })
                  window.location.reload()
                }}>
                  Selesaikan Transaksi
                </Button>
                <Button variant='contained' color='primary' style={{
                  color: 'white',
                  width: '49%'
                }} onClick={()=>window.location.href = data.transaction_proof}>
                  Lihat Bukti Pembayaran
                </Button>

              </div>
            </div>
          ) : (
            ""
          )}
          {data.transaction_status === "Dikemas" ? (
            <div style={
              {margin: '10px 20px 0px 20px',}
            }>
              <Stepper activeStep={0} alternativeLabel sx={{
                margin: '0px 0px 10px 0px'
              }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                height: '50px'
              }}>
                <Button variant='contained' color='error' style={{
                  color: 'white',
                  width: '49%'
                }} onClick={()=>{
                  API.post('updatetrans', {
                    transaction_status: 'Dikirim',
                    transaction_id: data.transaction_id,
                  })
                  window.location.reload()
                }}>
                  Barang Dikirim
                </Button>
                <Button variant='contained' color='primary' style={{
                  color: 'white',
                  width: '49%'
                }} onClick={()=>window.location.href = data.transaction_proof}>
                  Lihat Bukti Pembayaran
                </Button>

              </div>
            </div>
          ) : (
            ""
          )}
          {data.transaction_status === "Pending" && image !== null ? (
            <div style={{ width: "100%" }}>
              <img
                src={image}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  justifyItems: "center",
                  maxWidth: '60%',
                  margin: 'auto',
                  marginTop: '10px',
                  aspectRatio: "1/1",
                  objectFit: "cover",
                }}
              />
              <div style={
                  {margin: '10px 20px 0px 20px',}
              }>
                <Button variant='contained' color='merah' fullWidth style={{
                  color: 'white',
                }} onClick={()=>setImage(null)}>
                  Hapus Gambar
                </Button>
              </div>
            </div>
          ) : (
            ""
          )}
          {data.transaction_status === "Pending" ? (
            <div style={{ margin: "10px 20px 10px 20px"}}>
              <div style={{ 
                margin: 0, 
              }}>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  type="file"
                  onChange={handleUploadChange}
                />
                <label
                  htmlFor="raised-button-file"
                >
                  {image === null ? (
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      style={{
                        width: "49%",
                        marginBottom: "10px",
                        marginRight: '2%'
                      }}
                    >
                      Upload Bukti
                    </Button>
                  ) : (
                    ""
                  )}
                </label>
                {image !== null ? (
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{
                      width: "49%",
                      marginBottom: "10px",
                      marginRight: '2%',
                    }}
                    onClick={() => uploadImage(data.transaction_id)}
                  >
                    Terima Pesanan
                  </Button>
                ) : (
                  ""
                )}
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  type="file"
                  onChange={handleUploadChange}
                ></input>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    API.post(
                      "canceltransaction/" +
                        data.transaction_id
                    );
                    window.location.reload();
                  }}
                  style={{
                    width: "49%",
                    marginBottom: "10px",
                  }}
                >
                  Tolak Pesanan
                </Button>
              </div>
            </div>
          ) : (
            <div style={{ margin: "10px 20px 10px 20px" }}></div>
          )}
        </Card>
      ))}
    </div>
  );
}