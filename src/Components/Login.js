import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@material-ui/lab/Alert';
import bg from '../Assets/login-bg.jpg'
import TextField from '@mui/material/TextField'
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import './Login.css'
import Titlecomp from './Titlecomp'
import axios from 'axios'
import { Redirect } from 'react-router'
import { useHistory } from 'react-router-dom';


export default function Login(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [login, setLogin] = useState(false)
    const [token, setToken] = useState()

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.keyCode == '13') {
                handleClick();
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return function clean() {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [email,password]);

    let handleClick = async () => {

        try {
            setLoading(true);
            const res = await axios.post('https://demo.credy.in/api/v1/usermodule/login/', {
                'username': email,
                'password': password
            });
            let login = res.data.is_success
            if (login == true) {
                console.log('login done');
                const token = res.data.data.token
                setToken(token)
                setLogin(true)
                localStorage.setItem('token', token)
                setError('')
                history.push('/moviepage')
                setLoading(false)
            }
        } catch (err) {
            console.log(err);
            if (email == '' && password == '') {
                setError('Username and password cannot be empty')
            } else if (password == '') {
                setError('Password cannot be empty')
            } else if (email == '') {
                setError('Username cannot be empty')
            } else {
                setError('Please enter correct details')
            }
            setTimeout(() => {
                setError('')
            }, 2500);
            setLoading(false)
        }
    }
    let history = useHistory();

    return (


        <div className="loginWrapper">

            <div className="cardWrapper">
                <Card variant="shadow">
                    <div>
                        <img className='bgimg' src={bg} alt="bg" />
                    </div>
                    <CardContent sx={{ boxShadow: 8 }} className='login-modal'>
                        <div className="head">
                            {/* <MovieFilterIcon sx={{ fontSize: 50 }} className='logo' />&nbsp;&nbsp; */}
                            <div className={`name-light`}>
                                Movies+
                            </div>
                        </div>
                        <Typography style={{ color: '#350257', marginBottom: '2%' }} component="div">
                            Log in to let the action begin!
                        </Typography>
                        {error != '' && <Alert severity="error">{error}</Alert>}

                        <TextField className='inp' type="Email" className="outlined-basic" size="small" label="Username" variant="outlined" style={{ marginTop: '6%', width: '90%' }} margin="dense" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField className='inp' type="Password" className="outlined-basic" size="small" label="Password" variant="outlined" style={{ width: '90%' }} margin="dense" value={password} onChange={(e) => setPassword(e.target.value)} />

                        <Button variant="contained" style={{ width: '90%', marginTop: '5%' }} size="md" disabled={loading} onClick={handleClick}>
                            Login
                        </Button>



                    </CardContent>
                </Card>

            </div>
        </div>

    );
}
