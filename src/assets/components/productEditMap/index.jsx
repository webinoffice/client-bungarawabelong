    import React, { useState, useEffect } from 'react';
    import Grid from '@mui/material/Grid';
    import Box from '@mui/material/Box';
    import Card from '@mui/material/Card';
    import CardContent from '@mui/material/CardContent';
    import CardMedia from '@mui/material/CardMedia';
    import Typography from '@mui/material/Typography';
    import { CardActionArea } from '@mui/material';
    import axios from 'axios';
    import { useNavigate } from 'react-router-dom';

    const dummy = [
      // Your dummy data...
    ];

    function ProductEditMap({props}) {
      const [produk, setProduk] = useState([]);
      const navigate = useNavigate();
      console.log({props})
      console.log(produk)

      useEffect(() => {
        const grabHandler = async () => {
          try {
            const response = await axios.get(
              "http://localhost:8081/productbyshopid/" + props
            );
            setProduk(response.data);
            console.log(response.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };

        grabHandler();
      }, []); // Empty dependency array ensures this effect runs once on component mount

      return (
        // console.log(produk),
        <Box sx={{ maxWidth: "500px", margin: 2 }}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={2}
            sx={{ maxWidth: "500px" }}
          >
            {produk.map((data, index) => (
              <Grid item xs={6} key={index}>
                <Card
                  sx={{
                    maxWidth: "500px",
                    borderRadius: 1,
                  }}
                >
                  <CardActionArea
                    onClick={() =>
                      navigate("/edit-product/detail", { state: data })
                    }
                  >
                    <CardMedia
                      component="img"
                      height="150"
                      image={
                          data.product_image
                          || "default_image_url"
                      } // Provide a default image URL
                      alt="flower"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        sx={{
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        {data.product_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{fontSize: 12}}>
                        {data.shop.shop_name}
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

    export default ProductEditMap;
