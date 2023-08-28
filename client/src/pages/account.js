import React from 'react'
import MenuBar from '../components/menuBar'
import Textfield from '../components/textfield'
import ButtonCopy from '../components/buttonCopy'
import edit from '../images/edit.png'
import { useState } from 'react'
import axios from 'axios'

const Account = () => {
  const [disabled, setDisabled] = useState(true)
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(localStorage.getItem("full_name"))
  const [contact, setContact] = useState(localStorage.getItem("contact"))
  const [address, setAddress] = useState(localStorage.getItem("address"))

  const manageSubscription = () => {
    window.location.href = 'subscription'
  }

  const nameHandler = (event) => {
    setName(event.target.value)
  }

  const contactHandler = (event) => {
    setContact(event.target.value)
  }

  const addressHandler = (event) => {
    setAddress(event.target.value)
  }

  return (
    <div>
      <MenuBar/>
      <div>
      <div>
        <label>Edit Personal Information?</label>
        <button onClick={()=>{
          setDisabled(false)
          setEditing(true)
        }}>
          <img src={edit} style={{width: 30}}/>
        </button>
      </div>
        <Textfield disabled={disabled} defaultValue={localStorage.getItem("full_name")} label="Full Name" type="text" onChange={nameHandler}/>
        <Textfield disabled={disabled} defaultValue={localStorage.getItem("contact")} label="Contact" type="number" onChange={contactHandler}/>
        <Textfield disabled={disabled} defaultValue={localStorage.getItem("address")} label="Street Address 1" type="text" onChange={addressHandler}/>
      </div>
      <div>
        <Textfield disabled={true} defaultValue={localStorage.getItem("subscription")} label="Subscription Type"/>
        {editing && <ButtonCopy variant="contained" children="Add Subscription" onClick={manageSubscription}/>}
        {editing && <ButtonCopy variant="contained" children="Done Editing?" onClick={async ()=>{
          const confirm = window.confirm("Are you sure you want to update the information?")
          const email = localStorage.getItem("email")
          if(confirm){
            setEditing(false)
            setDisabled(true)
            const res = await axios.patch("http://localhost:8080/api/editAccount", {name, contact, address, email})
            localStorage.setItem("full_name", name)
            localStorage.setItem("contact", contact)
            localStorage.setItem("address", address)
          }
        }}/>}
      </div>
    </div>
  )
}

export default Account