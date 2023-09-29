import * as React from 'react';
import css from "./loginPage.module.css";
import { Typography, TextField, Button, IconButton } from '@mui/material';
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

function LoginPage() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:8081/login', {email, password});
            console.log(response.data);
            handleClick();
                
            
        } catch (error) {
            console.log("Gagal Mengambil Data");
        }
    }
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        
        setOpen(false);
        navigate(-1);
    };
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

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
                    <Button variant="outlined" color="primary" onClick={()=>(navigate(-1))} style={{
                        width: "100%", marginBottom: "10px"
                    }}>
                        Kembali
                    </Button>
                    <div style={{height: '50px'}}/>
                </form>
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={handleClose}
                    message="Sukses"
                    action={action}
                />
            </div>
        </div>
    );
}

export default LoginPage;