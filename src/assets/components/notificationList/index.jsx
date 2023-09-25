import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

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
  return (
    <div>
      {notification.map((data,index)=>(
        <Card sx={{ maxWidth: '100%', marginBottom: '10px' }}>
          <Typography gutterBottom sx={{
              fontWeight:"bold", 
              fontSize: 20,
              margin: "10px 20px 0px 20px"
          }}>
              {data.sender}, {data.phone}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{
            margin: "0px 20px 0px 20px"
          }}>
              {data.sendDate}
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{
            margin: "10px 20px 0px 20px"
          }}>
              {data.description}
          </Typography>
          <div style={{margin:'10px 20px 10px 20px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Button variant="contained" color="primary" type='submit' style={{
                width: "49%", marginBottom: "10px"
              }}>
                Terima Pesanan
              </Button>
              <Button variant="contained" color="error" type='submit' style={{
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