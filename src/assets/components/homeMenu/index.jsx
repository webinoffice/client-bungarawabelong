import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomeMenu() {

    const navigate = useNavigate();
    const handleProduct = ()=> navigate('/product')

  return (
    <div>
        <Card sx={{ 
            maxWidth: 500,
            borderRadius: 1,
            margin: 3,
        }}>
            <CardActionArea onClick={handleProduct}>
                <CardMedia
                    component="img"
                    height="100"
                    image="https://flowersofbath.co.uk/wp-content/uploads/2022/02/image0-47.jpeg"
                    alt="flower"
                />
                <CardContent>
                    <Typography gutterBottom sx={{
                        fontWeight:"bold", 
                        fontSize: 20,
                    }}>
                        Bunga Buket (Flower Bouquette)
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Cari berbagai varian bunga buket dari berbagai mitra disini
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

        <Card sx={{ 
            maxWidth: 500,
            borderRadius: 1,
            margin: 3,
            // marginBottom: 10,
        }}>
            <CardActionArea onClick={handleProduct}>
                <CardMedia
                    component="img"
                    height="100"
                    image="https://www.michaelflowerdesign.com/userfiles/image/Flower-Board/Flower-Board-06-=-IDR-1500_000.jpg"
                    alt="flower"
                />
                <CardContent>
                    <Typography gutterBottom sx={{
                        fontWeight:"bold", 
                        fontSize: 20,
                    }}>
                        Bunga Papan (Flower Board)
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Cari berbagai varian bunga papan dari berbagai mitra disini
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </div>
  );
}
