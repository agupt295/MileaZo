import React from 'react'
import Textfield from '../components/textfield'
import ButtonCopy from '../components/buttonCopy'
import { Link } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import './css_pages/css_signup.css'

const Signup = () => {

  const [fullName, setFullName] = useState(null)
  const [email, setEmail] = useState(null)
  const [contact, setContact] = useState(null)
  const [address, setAddress] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)

  const fullNameHandler = (event) => {
    setFullName(event.target.value)
  }

  const emailHandler = (event) => {
    setEmail(event.target.value)
  }

  const contactHandler = (event) => {
    setContact(event.target.value)
  }

  const addressHandler = (event) => {
    setAddress(event.target.value)
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value)
  } 

  const confirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value)
  }

  const creatingUser = async (fullName, email, contact, password, confirmPassword, address) => {
    if(fullName === "" || email === "" || contact === "" || password === "" || confirmPassword === "" || address === ""){
      window.alert("Fill all the blanks!")
    } else {
      if(password===confirmPassword){
        const userExists = await axios.post("http://localhost:8080/api/doesUserExists", {email})
        if(userExists.data.userExists){
          // don't let the user to signup
        } else {
          const subscription = "NONE"
          const userCreated = await axios.post("http://localhost:8080/api/createUser", {fullName, email, contact, password, address, subscription})
          window.location.href="create_service"
          localStorage.setItem("email", email)
          localStorage.setItem("password", password)
          localStorage.setItem("subscription", subscription)
        }
      } else {
        window.alert("Password and Confirm Password does not match! Try Again!")
      }
    }
  }

  return (
    <div className='Sign-up'>
      <h1>SIGN-UP</h1>
      <Textfield label="Full Name" onChange={fullNameHandler}/>
      <Textfield label="Email" onChange={emailHandler}/>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <Textfield label="Contact" type="number" onChange={contactHandler}/>
        <Textfield label="Street Address 1" type="text" onChange={addressHandler}/>
      </div>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <Textfield label="Password" type="password" onChange={passwordHandler}/>
        <Textfield label="Confirm Password" type="password" onChange={confirmPasswordHandler}/>
      </div>
      <ButtonCopy size="medium" variant="contained" children="Sign-Up" onClick={()=>{creatingUser(fullName, email, contact, password, confirmPassword, address)}}/>
      <Link href="login">Do you have an account? Login</Link>
    </div>
  )
}

export default Signup
