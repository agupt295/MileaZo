import React from 'react'
import NotFoundPic from '../images/NotFoundPic.png'

const Notfound = () => {
  return (
    <div style={{display: 'flex', justifyContent: "center", paddingLeft: 10}}>
    <img src={NotFoundPic} alt="Not Found" style={{width: 500}}/>
    </div>
  )
}

export default Notfound
