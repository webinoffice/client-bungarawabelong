import React, { useState, useEffect } from 'react';
import {TextField } from '@mui/material';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import {API} from '../../config/api.js';

function BankMap({para}) {
    const [bankName,setBankName] = useState(para.bank_name);
    const [bankNum,setBankNum] = useState(para.bank_number);

    const bankUpdate = async () => (
        await API.post('bankupdate', {
            bank_name: bankName,
            bank_number: bankNum,
            bank_id: para.bank_id,
        })
    )

    const bankDelete = async () => {
        await API.delete('bankdelete/' + para.bank_id)
        window.location.reload();
    }

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };
        
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        bankUpdate();
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
                    size='small' 
                    variant="contained"
                    sx={{color:'white', height:'25px'}}
                    onClick={()=>handleClick()}
                >
                    <UpgradeIcon fontSize='small'/>
                </Button>
                <Button 
                    size='small' 
                    variant="contained"
                    color='merah'
                    sx={{color:'white', height:'25px'}}
                    onClick={()=>bankDelete()}
                >
                    <DeleteOutlineIcon fontSize='small'/>
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

export default BankMap;