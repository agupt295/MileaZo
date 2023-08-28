import React from 'react'
import ListView from '../../components/listView'
import MenuBar from '../../components/menuBar'
import { Box, Card, CardActions, CardContent } from '@mui/material'
import ButtonCopy from '../../components/buttonCopy'
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react'
import axios from 'axios'
import No_Pending from '../../images/no_pending.png'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import I from '../../images/i.png'
import { Popover } from '@mui/material'

const PendingService = () => {

  const [cardsToDisplay, setCardsToDisplay] = useState([])
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("")
  const [children, setChildren] = useState("")

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
    const status = "pending"
    const services = await axios.post("http://localhost:8080/api/getServices", {email, status})
    setCardsToDisplay(services.data.row_data)
  }

  const renderCards = () => {
    if(cardsToDisplay === null) {
      return <img src={No_Pending} alt="image" style={{width: 600, paddingLeft: 170}}/>
    } else {
      return(
        cardsToDisplay.map((cardData, index)=>(
          <Box key={index} sx={{ margin: '10px' }}>
            <Card variant="outlined" sx={{ width: '250px', height: '350px'}}>{card(cardData, index)}</Card>
          </Box>
        ))
      )
    }
  }

  const sendToInProgress = async(data, index) => {
    setCardsToDisplay((prevCards) => prevCards.filter((cardData, i) => i !== index));
    await axios.patch("http://localhost:8080/api/changeToInProgress", data)
    setOpen(true)
    setSeverity("info")
    setChildren("Service is catalogued to In-progress Services!")
  }

  const cancelService = async(data, index) => {
    const confirm = window.confirm("Are you sure you want to delete the service of: " + data.car_owner)
    if(confirm){
      const res = await axios.post("http://localhost:8080/api/cancelService", data)
      if (res.data.deletion === "success") {
        // If the deletion is successful, update the state to remove the deleted card
        setCardsToDisplay((prevCards) => prevCards.filter((cardData, i) => i !== index));
        setOpen(true)
        setSeverity("error")
        setChildren("Service successfully deleted!")
      }
    }
  }

  const card = (data, index) => {
    return (
      <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {/* THE DIV BELOW GIVES AN ERROR, BUT THE CODE IS STILL WORKING */}
          <div>
            Owner
            <button style={{paddingLeft: 140, border: 'none'}} onClick={()=>{
              console.log("'i' is clicked")
              // return(
              //   <Popover>
              //     <Typography>Content of POP-OVER</Typography>
              //   </Popover>
              // )
            }}> <img src={I} style={{width: 30}}/></button>
          </div>
        {/* THE DIV ABOVE GIVES AN ERROR, BUT THE CODE IS STILL WORKING */}
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
        <Typography color="text.secondary" gutterBottom>
          Estimated Time: {data.cost}
        </Typography>
      </CardContent>
      <CardActions>
        <ButtonCopy variant="contained" size="small" children="Start Service" onClick={()=>{sendToInProgress(data, index)}}/>
        <ButtonCopy color="error" variant="contained" size="small" children="Cancel Service" onClick={()=>{cancelService(data, index)}}/>
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
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {children}
          </Alert>
        </Snackbar>
      </div>
    </div>
  )
}

export default PendingService