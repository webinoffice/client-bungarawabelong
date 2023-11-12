import React, { useState, useEffect } from 'react';
import {TextField } from '@mui/material';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

function BankAdd({para}) {
    const [bankName,setBankName] = useState('');
    const [bankNum,setBankNum] = useState('');

    const bankAdd = async () => (
        await axios.post('http://localhost:8081/bankcreate', {
            bank_name: bankName,
            bank_number: bankNum,
            shop_id: para,
        })
    )

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };
        
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        bankAdd();
        setOpen(false);
        window.location.reload();
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
        <div style={{ 
            display: "flex", 
            justifyContent: "space-between",
            marginTop: '10px'
        }}>
            <TextField
                style={{ width: "30%" }}
                type="text"
                label="Nama Bank"
                variant="outlined"
                onChange={(e) => setBankName(e.target.value)}
                value={bankName}
            />
            <TextField
                style={{ width: "48%" }}
                type="text"
                label="No. Rekening"
                variant="outlined"
                onChange={(e) => setBankNum(e.target.value)}
                value={bankNum}
            />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '19%'
            }}>
                <Button 
                    variant="contained"
                    color='error'
                    sx={{color:'white', height:'100%'}}
                    onClick={()=>handleClick()}
                >
                    <AddCircleOutlineIcon/>
                </Button>
            </div>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message={'Sukses!'}
                action={action}
            />
        </div>
    )
}

export default BankAdd;