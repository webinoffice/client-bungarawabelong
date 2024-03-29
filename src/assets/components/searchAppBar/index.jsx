import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import {API} from '../../config/api.js';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '50%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function SearchAppBar() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [productSearch, setProductSearch] = useState([]);

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      try {
        const response = await API.get("search/"+value);
        setProductSearch(response.data);
        navigate('/product/'+value, {state: response.data});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color='background'>
        <Toolbar>
          <img src='./logo1.png' style={{height:35}} onClick={()=>navigate('/land')}/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}/>
          <Search>
            <SearchIconWrapper>
              <SearchIcon size="large"
                edge="end"
                color="primary"
                aria-label="menu"
                
                />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Cari..."
              inputProps={{ 'aria-label': 'search' }}
              onChange={e=>(setValue(e.target.value))}
              onKeyDown={handleKeyDown}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </Box>
  );
}