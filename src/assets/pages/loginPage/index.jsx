import * as React from 'react';
import css from "./loginPage.module.css";
import { Typography, TextField, Button } from '@mui/material';


function LoginPage() {
    return ( 
        <div className={css.topPallete}> 
            <div style={{
                width: "100%",
            }}>
                <Typography gutterBottom sx={{
                    fontWeight:"bold", 
                    fontSize: 22,
                    maxWidth: '500px',
                    margin: 2,
                    textAlign: 'center'
                }}>
                    Masuk Toko
                </Typography>
                <form style={{
                    marginBottom: 'auto',
                    marginTop: '10px',
                    marginLeft: '20px',
                    marginRight: '20px',
                }}>
                    <TextField
                        style={{ width: "100%", marginBottom: "10px"}}
                        type="email"
                        label="E-Mail"
                        variant="outlined"
                    />
                    <br />
                    <TextField
                        style={{ width: "100%", marginBottom: "20px" }}
                        type="password"
                        label="Password"
                        variant="outlined"
                    />
                    <br />
                    <Button variant="contained" color="primary" style={{
                        width: "100%", marginBottom: "10px"
                    }}>
                        Masuk
                    </Button>
                    <Button variant="outlined" color="primary" style={{
                        width: "100%", marginBottom: "10px"
                    }}>
                        Kembali
                    </Button>
                    <Button variant="text" color="error" style={{
                        width: "100%", marginBottom: "10px", textTransform: 'none'
                    }}>
                        Lupa password? Klik disini
                    </Button>
                    <div style={{height: '50px'}}/>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;