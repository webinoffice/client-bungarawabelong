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
        const response = await axios.get("http://localhost:8081/gettransactionbyshopid/" + 1);
        setTransaksi(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    grabHandler();
  }, []);

  const handleUpdate  = async()=>{}

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
            {data.transaction_time}
          </Typography>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{
              margin: "10px 20px 0px 20px",
            }}
          >
            {data.transaction_description}
          </Typography>
          {data.transaction_status === "Pending" ? (
            <div style={{ margin: "10px 20px 10px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    {axios.post("http://localhost:8081/updatetransaction/", {
                      transaction_id: data.transaction_id,
                    })
                    window.location.reload()
                    }
                  }
                  style={{
                    width: "49%",
                    marginBottom: "10px",
                  }}
                >
                  Terima Pesanan
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() =>
                    {axios.delete("http://localhost:8081/canceltransaction/"+ data.transaction_id) 
                    window.location.reload()}
                  }
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
            <div style={{ margin: "10px 20px 10px 20px" }}>
              
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}