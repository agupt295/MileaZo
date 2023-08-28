import React from 'react'
import { Link } from '@mui/material'
import ButtonCopy from './buttonCopy'
import './css_components/css_menuBar.css'

function MenuBar() {
  const logout = () => {
    const confirm = window.confirm("Are you sure you want to logout? All the unsaved data will be lost!")
    if(confirm){
      localStorage.clear()
      window.location.href="login"
    }
  }

  return (
    <div className="menu">
      <Link href="create_service">Dashboard</Link>
      <Link href="availability" style={{paddingLeft: 500, paddingRight: 100}}>Availability</Link>
      <Link href="subscription" style={{paddingRight: 100}}>Subscription</Link>
      <Link href="account" style={{paddingRight: 100}}>Account</Link>
      <ButtonCopy children="Logout" size="medium" variant="contained" onClick={()=>{logout()}}/>
    </div>
  )
}

export default MenuBar
