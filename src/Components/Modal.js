import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Typography } from '@mui/material';

function Modal(props) {
    let movie = props.movie;
    return (

        <Dialog
            open={props.open == movie.uuid}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                backdropFilter: "blur(5px)"
              }}
        >
            <div className={`modalwrap-${props.mode == `light` ? `light` : `dark`}`}>
                <DialogTitle sx={{color:'red',fontSize:'2rem'}} id="alert-dialog-title">
                    {movie.title}
                </DialogTitle>
                <div>
                    <img className={`modal-ava-${props.mode == `light` ? `light` : `dark`}`} src={`https://ui-avatars.com/api/?rounded=false&name=${movie.title}`} alt="avatar image" />
                </div>
                <DialogContent >
                    <DialogContentText sx={{color:`${props.mode == `light` ? `black` : `#e9f5f8`}`}} id="alert-dialog-description">
                        {movie.description}
                    </DialogContentText>
                </DialogContent>

                <Typography sx={{ textAlign: 'center', fontWeight: 'bold', color: 'red' }} variant="body2" color="text.secondary">
                    {movie.genres}
                </Typography>

                <DialogActions>
                    <Button onClick={props.handleClose}>Close</Button>
                </DialogActions>
            </div>
        </Dialog>
    )
}

export default Modal