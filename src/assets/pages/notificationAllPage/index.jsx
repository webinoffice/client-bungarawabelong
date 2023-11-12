import * as React from 'react';
import css from "./notificationAllPage.module.css";
import PageAppBar from '../../components/pageAppBar';
import NotificationList from '../../components/notificationList';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';

function NotificationAllPage() {
  const [transaksi, setTransaksi] = useState([]);
    useEffect(() => {
        const grabHandler = async () => {
          try {
            const response = await axios.get("http://localhost:8081/gettransactionall");
            setTransaksi(response.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        grabHandler();
      }, []);
      console.log(transaksi);
    return ( 
        <div className={css.topPallete}>
            <PageAppBar/>
            <Typography gutterBottom sx={{
                fontWeight:"bold", 
                fontSize: 22,
                maxWidth: '500px',
                margin: 2
            }}>
                Semua Notifikasi Pesanan
            </Typography>
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
                        {data.transaction_time}
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
                    <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{
                        margin: "10px 20px 0px 20px",
                        }}
                    >
                        Status: {data.transaction_status}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{
                        margin: "10px 20px 0px 20px",
                        }}
                    >
                        Pemilik Toko: {data.product.shop.shop_name}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{
                        margin: "10px 20px 10px 20px",
                        fontWeight: 'bold',
                        }}
                    >
                        Nilai Transaksi: {data.product.product_price}
                    </Typography>
                </Card>
            ))}
        </div>
    );
}

export default NotificationAllPage;