import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Titlecomp from './Titlecomp';
import './Navbar.css'
import { Button, TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Redirect } from 'react-router-dom';
import Login from './Login';
import { useHistory } from 'react-router-dom';

export default function Navbar(props) {
  let history = useHistory();
  let movies = props.movies;






  let handleSearch = () => {
    console.log(props.input);
  }

  let handleKeySearch = (e) => {
    if (e.keyCode == '13') {
      handleSearch();
    }
  }


  let logout = () => {

    localStorage.removeItem("token");
    history.push('/')

  }

  let col;
  {
    if (localStorage.getItem('mode')) {
      props.setMode(localStorage.getItem('mode'))
      if (localStorage.getItem('mode') == 'light') {
        col = '#cadef5'
      } else {
        col = '#051c30'
      }
    } else {
      col = '#cadef5'
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>

      <AppBar className='mobnav' sx={{ background: col }} position="fixed">
        <Toolbar>

          <div onClick={props.showCurrentMovies} style={{ cursor: 'pointer' }} className={`navlogo-${props.mode}`}>
            Movies+
          </div>
          <div  className="searchwrap">
            <div className={`siwrap-${props.mode == `light` ? `light` : `dark`}`}>
              <SearchIcon />
            </div>
            <TextField onChange={props.handleInput} autoComplete='off' sx={{ width: '45vw' }} className='inp' type="Email" className="outlined-basic" size="small" label="Search Movies" variant="filled" />
          </div>
          <div className={`switchwrap mx-4 form-check text-${props.mode === 'light' ? 'dark' : 'light'} form-switch`}>
            <input className="form-check-input" data-onstyle="danger" onClick={props.toggleMode} type="checkbox" checked={`${props.mode === 'light' ? '' : 'on'}`} role="switch" id="flexSwitchCheckDefault" />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Dark Mode</label>
          </div>
          <Button onClick={logout} color={ `${props.mode == `light` ? `primary` : `secondary`}`} sx={{ color: `${props.mode == `light` ? `black` : `white`}`, borderColor: `${props.mode == `light` ? `black` : `white`}` }} variant="contained">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
