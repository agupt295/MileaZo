import React from 'react'
import MenuBar from '../components/menuBar'
import { Box, Card, CardActionArea, CardContent } from '@mui/material'
import { Typography } from '@mui/material'
import green_Tick from '../images/green_tick.png'
import red_cross from '../images/red_cross.png'

const card = (type, benefits, price) => {
  return (
    <React.Fragment>
      <CardContent>
        <CardActionArea onClick={()=>{
          window.location.href="subscription_payment"
        }}>
          <Typography variant="h4" color="text.secondary">
            {type}
          </Typography>
          <Typography variant="h6" component="div">
            {benefits}
          </Typography>
          <br/>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Monthly Price:
          </Typography>
            <Typography variant="h4">
              {price}
              <br />
            </Typography>
        </CardActionArea>
      </CardContent>
  </React.Fragment>
  )
}

const Benefits = (img1, img2, img3, img4) => {
  return (
    <div>
      <ul> <img style={{width: 20}} src={img1} alt="#"/>  Unlimited Services</ul>
      <ul> <img style={{width: 20}} src={img2} alt="#"/>  Manage unlimited Services</ul>
      <ul> <img style={{width: 20}} src={img3} alt="#"/>  Unlimited Service History</ul>
      <ul> <img style={{width: 20}} src={img4} alt="#"/>  More Features</ul>
    </div>
  )
}

const Subscription = () => {
  return (
    <div>
      <div>
        <MenuBar/>
          <div style={{padding: 50}}>
            <Box style={{display: 'flex', flexDirection: 'row'}}>
              <Card variant="outlined" style={{width:300, height:500}}>{card("BASIC", Benefits(green_Tick, red_cross, red_cross, red_cross), "$5")}</Card>
              <Card variant="outlined" style={{width:300, height:500}}>{card("STANDARD", Benefits(green_Tick, green_Tick, red_cross, red_cross), "$10")}</Card>
              <Card variant="outlined" style={{width:300, height:500}}>{card("PREMIUM", Benefits(green_Tick, green_Tick, green_Tick, green_Tick), "$15")}</Card>
            </Box>
          </div>
        </div>
    </div>
  )
}

export default Subscription