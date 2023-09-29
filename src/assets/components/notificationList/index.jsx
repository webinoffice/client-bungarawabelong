import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';

const notification=[
  {
    sender: 'Bernando',
    productname: 'Buket Bunga Mawar',
    phone: '099292929',
    description: 'sdhajkhdsajk sahdjksahdjka hsjkdhjdh hfjhf jdshjkfhs k',
    sendDate: '14:01, 27 Agustus 2023'
  },
  {
    sender: 'Jordan',
    productname: 'Buket Bunga Melati',
    phone: '09929292229',
    description: 'sdhajkhdsajk sdadsasahdjksahdjka hsjkdhjdh hfjhf jdshjkfhs k',
    sendDate: '17:09, 28 Agustus 2023'
  }
]

export default function NotificationList() {
  const [transaksi, setTransaksi] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const grabHandler = async () => {
      try {
        const response = await axios.get("http://localhost:8081/readtransaksibyid/" + 3);
        setTransaksi(response.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    grabHandler();
  }, []);

  return (
    <div>
      {transaksi.map((data,index)=>(
        <Card sx={{ maxWidth: '100%', marginBottom: '10px' }}>
          <Typography gutterBottom color='primary' sx={{
              fontWeight:"bold", 
              fontSize: 20,
              margin: "10px 20px 0px 20px"
          }}>
              {data.namaProduk}
          </Typography>
          <Typography gutterBottom sx={{
              fontWeight:"bold", 
              fontSize: 18,
              margin: "0px 20px 0px 20px"
          }}>
              Pemesan: {data.nama}, {data.noTelp}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{
            margin: "0px 20px 0px 20px"
          }}>
              {data.waktu}
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{
            margin: "10px 20px 0px 20px"
          }}>
              {data.deskripsi}
          </Typography>
          <div style={{margin:'10px 20px 10px 20px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Button variant="contained" color="primary" 
                onClick={()=>(
                  axios.post("http://localhost:8081/updatestatus/" + data.id)
                )} style={{
                width: "49%", marginBottom: "10px"
              }}>
                Terima Pesanan
              </Button>
              <Button variant="contained" color="error" 
              onClick={()=>(axios.post("http://localhost:8081/deletestatus/" + data.id))} style={{
                width: "49%", marginBottom: "10px"
              }}>
                Tolak Pesanan
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}