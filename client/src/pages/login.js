import Textfield from '../components/textfield'
import ButtonCopy from '../components/buttonCopy';
import { Link } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import './css_pages/css_login.css'

function Login() {

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const emailHandler = (event) => {
    setEmail(event.target.value)
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value)
  }

  const checkUserDetail = async(email, password) => {
    if(email === "" || password === ""){
      window.alert("Fill all the blanks!")
    } else {
      const res = await axios.post("http://localhost:8080/api/verifyUser", {email, password})
      const user_data = await axios.post("http://localhost:8080/api/userInfo", {email})
      if(res.data.output==="User Exists") {
        localStorage.setItem("email", email)
        localStorage.setItem("password", password)
        localStorage.setItem("full_name", user_data.data.data.full_name)
        localStorage.setItem("subscription", user_data.data.data.subscription)
        localStorage.setItem("address", user_data.data.data.address)
        localStorage.setItem("contact", user_data.data.data.contact)
        window.location.href="create_service"
      } else {
        window.alert("Invalid Credentials!")
      }
    }
  }

  return (
    <div className="App">
      <h1>LOGIN</h1>
      <Textfield label="Email" onChange={emailHandler}/>
      <Textfield label="Password" onChange={passwordHandler}/>
      <ButtonCopy variant="contained" size="medium" children="LOGIN" onClick = {() => {checkUserDetail(email, password)}}/>
      <Link href="sign-up">Don't have an account? Sign-up</Link>
      <Link href="forgot_pasword">Forgot Password?</Link>
    </div>
  );
}

export default Login;
