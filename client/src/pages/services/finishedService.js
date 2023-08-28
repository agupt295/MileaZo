import React from 'react'
import ListView from '../../components/listView'
import MenuBar from '../../components/menuBar'
import { Box, Card, CardContent } from '@mui/material'
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react'
import axios from 'axios'
import No_Finished from '../../images/no_finished.png'

const FinishedService = () => {
  const [cardsToDisplay, setCardsToDisplay] = useState([])

  useEffect(()=> {
    getCards()
  }, [])

  const getCards = async() => {
    const email = localStorage.getItem("email")
    const status = "finished"
    const services = await axios.post("http://localhost:8080/api/getServices", {email, status})
    setCardsToDisplay(services.data.row_data)
  }

  const renderCards = () => {
    if(cardsToDisplay===null){
      return <img src={No_Finished} alt= "image" style={{width: 600, paddingLeft: 170}}/>
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
    </React.Fragment>
  )
  }
  return (
    <div>
      <MenuBar/>
      <div style={{display: 'flex'}}>
        <ListView/>
        {renderCards()}
      </div>
    </div>
  )
}

export default FinishedService