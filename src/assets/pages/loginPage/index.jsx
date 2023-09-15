import * as React from 'react';
import css from "./loginPage.module.css";
import { Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useState } from "react";

function LoginPage() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
 
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:8081/login', {email, password});
            if (response.data === "sukses") {
                console.log("berhasil login");
            } else {
                console.log("gagal login");
            }
        } catch (error) {
            console.log("ambil data gagal");
        }
    }

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
                }}onSubmit={handleSubmit}>
                    <TextField
                        style={{ width: "100%", marginBottom: "10px"}}
                        type="email"
                        label="E-Mail"
                        variant="outlined"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <br />
                    <TextField
                        style={{ width: "100%", marginBottom: "20px" }}
                        type="password"
                        label="Password"
                        variant="outlined"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <br />
                    <Button variant="contained" color="primary" type='submit' style={{
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