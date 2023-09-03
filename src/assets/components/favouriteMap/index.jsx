import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const dummy = [
    {
      label: 'Dummy 1',
      label2: 'Dummy 1',
      imgPath:
        'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
      label: 'Dummy 2',
      label2: 'Dummy 1',
      imgPath:
        'https://www.wallpaperwalaa.com/wp-content/uploads/2019/04/3D-FLOWER-7-400x250.jpg',
    },
    {
      label: 'Dummy 3',
      label2: 'Dummy 1',
      imgPath:
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    },
    {
      label: 'Dummy 4',
      label2: 'Dummy 1',
      imgPath:
        'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
  ];

function FavouriteMap() {
    return ( 
    <Box sx={{ maxWidth: '500px', margin: 2 }}>
        <Grid container rowSpacing={2} columnSpacing={2} sx={{maxWidth: '500px'}}>
            {dummy.map((data, index)=>(
                <Grid item xs={6}>
                    <Card sx={{ 
                        maxWidth: '500px',
                        borderRadius: 1,
                    }}>
                        <CardActionArea onClick={null}>
                            <CardMedia
                                component="img"
                                height="150"
                                image={data.imgPath}
                                alt="flower"
                            />
                            <CardContent>
                                <Typography gutterBottom sx={{
                                    fontWeight:"bold", 
                                    fontSize: 20,
                                }}>
                                    {data.label}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {data.label2}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Box>
    );
}

export default FavouriteMap;