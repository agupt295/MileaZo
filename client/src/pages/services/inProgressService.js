import React from 'react'
import ListView from '../../components/listView'
import MenuBar from '../../components/menuBar'
import { Box, Card, CardActions, CardContent } from '@mui/material'
import ButtonCopy from '../../components/buttonCopy'
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react'
import axios from 'axios'
import No_InProgress from '../../images/no_inProgress.png'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const InProgressService = () => {
  const [cardsToDisplay, setCardsToDisplay] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(()=> {
    getCards()
  }, [])

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const getCards = async() => {
    const email = localStorage.getItem("email")
    const status = "inProgress"
    const services = await axios.post("http://localhost:8080/api/getServices", {email, status})
    setCardsToDisplay(services.data.row_data)
  }

  const renderCards = () => {
    if(cardsToDisplay === null){
      return <img src={No_InProgress} alt="image" style={{width: 600, paddingLeft: 170}}/>
    } else {
      return(
        cardsToDisplay.map((cardData, index)=>(
          <Box key={index} sx={{ margin: '10px' }}>
            <Card variant="outlined" sx={{ width: '200px', height: '300px'}}>{card(cardData, index)}</Card>
          </Box>
        ))
      )
    }
  }

  const sendToFinished = async(data, index) => {
    setCardsToDisplay((prevCards) => prevCards.filter((cardData, i) => i !== index));
    await axios.patch("http://localhost:8080/api/changeToFinished", data)
    setOpen(true)
  }

  const card = (data, index) => {
    return (
      <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Owner
        </Typography>
        <Typography variant="h5" component="div">
          {data.car_owner}
        </Typography>
        <br/>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Services Requested
        </Typography>
        <Typography variant="body2">
          {data.services}
          <br />
          {data.car_brand}
          <br/>
          {data.car_plate}
        </Typography>
        <Typography variant='h5' color="text.secondary" gutterBottom>
          Amount: {data.cost}
        </Typography>
      </CardContent>
      <CardActions>
        <ButtonCopy variant="contained" size="small" children="Finish Service" onClick={()=>{sendToFinished(data, index)}}/>
      </CardActions>
    </React.Fragment>
  )
  }
  return (
    <div>
      <MenuBar/>
      <div style={{display: 'flex'}}>
        <ListView/>
        {renderCards()}
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
            Service is catalogued to Finished Services!
          </Alert>
        </Snackbar>
      </div>
    </div>
  )
}

export default InProgressService
