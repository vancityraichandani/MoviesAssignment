import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavigateBeforeRounded } from '@material-ui/icons'
import Navbar from './Navbar'
import './Moviepage.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CircularProgress, Pagination } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import bgdark from '../Assets/flower-dark.jpg'
import bglight from '../Assets/flower-light.jpg'
import Modal from './Modal'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { waitForElementToBeRemoved } from '@testing-library/react'
// import { Button } from '@mui/material';



function Moviepage(props) {
  let bg;
  {
    if (props.mode == 'light') {
      bg = bglight;
    } else {
      bg = bgdark;
    }
  }
  document.body.style.backgroundImage = `url(${bg})`;

  const [error, setError] = useState(false);
  const [parr, setParr] = useState([1]);
  const [currpage, setCurrpage] = useState(1);
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [input, setInput] = useState('');
  const [filterList, setFilterList] = useState([]);
  const [time, setTime] = useState(null);

  //search bar
  var inpLower = '';
  useEffect(() => {
    console.log('filter ue re-render');
  }, [input])

  let handleInput = (e) => {


    if (time != null) {
      clearTimeout(time);
    }

    inpLower = e.target.value.toLowerCase();
    console.log(inpLower);
    setInput(inpLower)
    setTime(setTimeout(() => {

      setFilterList(movies.filter((movie) => {
        return movie.title.toLowerCase().includes(inpLower);
      }))
    }, 250));

    console.log(filterList);
  }





  //first time mount
  useEffect(async () => {
    try {

      setLoading(true);

      let res = await axios.get(`https://demo.credy.in/api/v1/maya/movies/?page=${currpage}`, {
        headers: {
          'Authorization': 'Token ' + localStorage.getItem('token')
        }
      });

      setLoading(false);
      let data = res.data;
      // console.log(data);
      setMovies([...data.results]);
      console.log(data.results);

    } catch (error) {
      setError(true);
      setLoading(false)

      console.log(error)

    }
  }, [])


  let n;
  let handleNum = (num) => {
    n = num;
  }


  let showCurrentMovies = async () => {

    try {
      console.log('worked');
      setRefresh(false)
      setLoading(true);


      let res = await axios.get(`https://demo.credy.in/api/v1/maya/movies/?page=${currpage}`, {
        headers: {
          'Authorization': 'Token ' + localStorage.getItem('token')
        },
      });

      setLoading(false);

      let data = res.data;
      // console.log(data);
      setMovies([]);
      setMovies([...data.results]);
      console.log(data.results);

    } catch (error) {
      console.log('not wrkd');
      console.log(error);
      setError(true);
      // if(error.message)
      setRefresh(true);
      setLoading(false)
    }
  }

  useEffect(() => {

    console.log("ue called");
    showCurrentMovies();
  }, [currpage, parr])

  let handleForward = () => {
    console.log("next clicked");
    let temp = [];

    for (let i = 1; i <= parr.length + 1; i++) {
      temp.push(i);
    }
    setParr([...temp]);
    setCurrpage(parr.length + 1);
    console.log(currpage);
  }

  let handleBackward = () => {
    console.log("back clicked");
    if (currpage != 1) {
      let temp = [];

      for (let i = 1; i <= parr.length - 1; i++) {
        temp.push(i);
      }
      setParr([...temp]);
      setCurrpage(currpage - 1);
      console.log(currpage);
    }
  }



  let handleClick = (val) => {
    setCurrpage(val);
  }

  const [open, setOpen] = useState(null);

  const handleClose = () => {
    setOpen('');
  };

  let handleClickOpen = (movie) => {
    setOpen(movie.uuid);

    // console.log(movie.title);
  }




  return (
    <div className="cardwrap">
      <Navbar input={input} handleInput={handleInput} movies={movies}
        showCurrentMovies={showCurrentMovies} setMode={props.setMode}
        toggleMode={props.toggleMode} mode={props.mode} />
      <>
        {
          movies.length == 0 || loading ?
            <div className="loaderwrap">
              <CircularProgress color="secondary" />
            </div>

            :


            input != '' ?
              <div className="movie-card">

                {


                  filterList.map((movieObj) => (

                    < div className="cardmob" style={{ border: `3px solid ${props.mode == `light` ? `#239afc` : `white`}`, backgroundColor: `${props.mode == `light` ? `#cae4fa` : `#052d4e`}`, color: '#1e3c68', marginRight: '2%', marginTop: '10%' }}>
                      <div style={{ fontSize:'1.5rem',fontWeight: 'bold', textAlign: 'center', color: `${props.mode == `light` ? `black` : `white`}`, marginBottom: '3vw', maxHeight: '2vw' }} variant="h5" component="div">
                        {movieObj.title.length > 15 ? movieObj.title.substring(0, 20) + '...' : movieObj.title}
                      </div>
                      <div className="avawrap">
                        <img src={`https://ui-avatars.com/api/?rounded=true&name=${movieObj.title}`} alt="avatar image" className={`ava-${props.mode == `light` ? `light` : `dark`}`} />
                      </div>
                      <div style={{ paddingTop:'0.8rem',minHeight:'6vh',textAlign: 'center', color: `${props.mode == `light` ? `black` : `white`}`, marginBottom: '1vw', maxHeight: '3vw' }} variant="body2" color="text.secondary">
                        {movieObj.description.length > 40 ? movieObj.description.substring(0, 35) + '...' : movieObj.description}
                      </div>
                      <div className="genre">
                        <div style={{ minHeight:'3vh',textAlign: 'center', fontWeight: 'bold', color: `${props.mode == `light` ? `red` : `red`}` }} variant="body2" color="text.secondary">
                          {movieObj.genres.length > 15 ? movieObj.genres.substring(0, 15) + '...' : movieObj.genres}
                        </div>
                      </div>
                      <div className="viewmore">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <Button onClick={() => handleClickOpen(movieObj)} color={`${props.mode == `light` ? `info` : `secondary`}`} variant="contained" sx={{ marginTop:'1.9rem',fontFamily: 'cursive', color: `${props.mode == `light` ? `black` : `white`}` }} size="small">View more</Button>
                          <Modal handleClose={handleClose} movie={movieObj} open={open} mode={props.mode} />
                        </div>

                      </div>

                    </div>

                  ))
                }

              </div>
              :


              <div className="movie-card">

                {


                  movies.map((movieObj) => (
                    < div className="cardmob" style={{ border: `3px solid ${props.mode == `light` ? `#239afc` : `white`}`, backgroundColor: `${props.mode == `light` ? `#cae4fa` : `#052d4e`}`, color: '#1e3c68', marginRight: '2%', marginTop: '10%' }}>
                      <div style={{ fontSize:'1.5rem',fontWeight: 'bold', textAlign: 'center', color: `${props.mode == `light` ? `black` : `white`}`, marginBottom: '3vw', maxHeight: '2vw' }} variant="h5" component="div">
                        {movieObj.title.length > 15 ? movieObj.title.substring(0, 20) + '...' : movieObj.title}
                      </div>
                      <div className="avawrap">
                        <img src={`https://ui-avatars.com/api/?rounded=true&name=${movieObj.title}`} alt="avatar image" className={`ava-${props.mode == `light` ? `light` : `dark`}`} />
                      </div>
                      <div style={{ paddingTop:'0.8rem',minHeight:'4vh',textAlign: 'center', color: `${props.mode == `light` ? `black` : `white`}`, marginBottom: '1vw', maxHeight: '3vw' }} variant="body2" color="text.secondary">
                        {movieObj.description.length > 40 ? movieObj.description.substring(0, 35) + '...' : movieObj.description}
                      </div>
                      <div className="genre">
                        <div style={{ minHeight:'3vh',textAlign: 'center', fontWeight: 'bold', color: `${props.mode == `light` ? `red` : `red`}` }} variant="body2" color="text.secondary">
                          {movieObj.genres.length > 15 ? movieObj.genres.substring(0, 15) + '...' : movieObj.genres}
                        </div>
                      </div>
                      <div className="viewmore">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <Button onClick={() => handleClickOpen(movieObj)} color={`${props.mode == `light` ? `info` : `secondary`}`} variant="contained" sx={{ marginBottom:'0.5rem',marginTop:'1.9rem',fontFamily: 'cursive', color: `${props.mode == `light` ? `black` : `white`}` }} size="small">View more</Button>
                          <Modal handleClose={handleClose} movie={movieObj} open={open} mode={props.mode} />
                        </div>

                      </div>

                    </div>

                  ))
                }

              </div>

        }

      </>
      <div className="refwrap">
        <div className="ref">
          {
            refresh && <button type="button" onClick={showCurrentMovies} className={`btn btn-${props.mode == 'light' ? `primary` : `dark`}`}>Click to Refresh</button>
          }
        </div>
      </div>

      <div className="pagination">
        <li className="page-item"><a className="page-link" onClick={handleBackward}>Previous</a></li>
        {
          parr.map((num) => (
            <li className={`page-item`}><a className="page-link" onClick={() => handleClick(num)}>{num}</a></li>
          ))
        }


        <li className="page-item"><a className="page-link" onClick={handleForward}>Next</a></li>

      </div>
    </div >


  )
}

export default Moviepage