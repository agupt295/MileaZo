import React from 'react'
import Textfield from '../components/textfield'
import ButtonCopy from '../components/buttonCopy'
import { useState } from 'react'
import { Link } from '@mui/material'
import axios from 'axios'

const ForgotPassword = () => {
    const [email, setEmail] = useState(null)
    const [newPassword, setNewPassword] = useState(null)
    const [newEntry, setNewEntry] = useState(false)
    const [oldEntry, setOldEntry] = useState(true)
    const [disabled, setDisabled] = useState(false)

    const emailHandler = (event) => {
        setEmail(event.target.value)
    }
    
    const passwordHandler = (event) => {
        setNewPassword(event.target.value)
    }

    const resetPassword = async (email, newPassword) => {
        const confirm = window.confirm("Do you want to change the Password?")
        if(confirm) {
            // const res = await axios.patch("http://localhost:8080/api/updatePassword", {email, newPassword})
        }
    }

  return (
    <div className="App">
      <h1>Forgot Password</h1>
      <Textfield disabled={disabled} label="Email" onChange={emailHandler}/>
      {oldEntry && <div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <Textfield label="OTP" type="number"/>
            <ButtonCopy variant="contained" size="small" children="Send OTP" />
        </div>
        <ButtonCopy variant="contained" size="small" children="Confirm OTP" onClick={()=>{
                setNewEntry(true)
                setOldEntry(false)
                setDisabled(true)
            }}/>
      </div>}
      {newEntry && <div>
        <Textfield label="New Password" onChange={passwordHandler}/>
        <ButtonCopy variant="contained" size="medium" children="Reset" onClick = {() => {
            if(newPassword === ""){
                window.confirm("New Password Entry cannot be blank!")
            } else {
                {resetPassword(email, newPassword)}
            }
            }}/>
      </div>}
      <Link href="login">Go back To Login Page</Link>
    </div>
  )
}

export default ForgotPassword