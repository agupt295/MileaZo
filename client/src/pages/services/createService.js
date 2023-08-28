import React from 'react'
import ListView from '../../components/listView'
import MenuBar from '../../components/menuBar'
import Textfield from '../../components/textfield'
import { FormGroup, FormControlLabel } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import ButtonCopy from '../../components/buttonCopy'
import { useState } from 'react'
import axios from 'axios'
import './css_services/css_createService.css'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TimePicker from '../../components/timePicker'

const CreateService = () => {

  const [owner, setOwner] = useState("")
  const [plate, setPlate] = useState("")
  const [brand, setBrand] = useState("")
  const [model, setModel] = useState("")
  const [contact, setContact] = useState(null)
  const [customerEmail, setCustomerEmail] = useState(null)
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([])
  const [open, setOpen] = useState(false)
  const [cost, setCost] = useState(0)
  const [time, setTime] = useState(null)
  const [comments, setComments] = useState(null)

  const checkBoxes = [
    {id: "1", label: "Periodic Services"},
    {id: "2", label: "AC Repair"},
    {id: "3", label: "Wheels Repair"}
  ]

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const timeHandler = (event) => {
    setTime(event.target.value)
  }

  const checkBoxHandler = (event) => {
    const checkBoxLabel = event.target.value
    const isSelected = selectedCheckboxes.includes(checkBoxLabel);
    if(isSelected) {
      setSelectedCheckboxes(selectedCheckboxes.filter((value) => value !== checkBoxLabel));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, checkBoxLabel]);
    }
  }

  const createService = async(email, owner, selectedCheckboxes, plate, brand, model, cost, contact, customerEmail, comments) => {
    const status = "pending"
    if(owner === "" || plate === "" || brand === "" || selectedCheckboxes.length === 0 || contact === "" || customerEmail==="" || model==="" || cost===0){
      window.alert("Fill all the fields!")
    } else {
      await axios.post("http://localhost:8080/api/createService", {email, owner, selectedCheckboxes, plate, brand, status, cost, contact, customerEmail, comments})
      setOpen(true);
    }
  }

  return (
    <div>
        <MenuBar/>
        <div style={{display: 'flex'}}>
            <ListView/>
            <div className="main_page">
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <Textfield label="Name of Owner" variant="outlined" onChange={(event)=>{setOwner(event.target.value)}}/>
                <Textfield label="Vehicle Number Plate" variant="outlined" onChange={(event)=>{setPlate(event.target.value)}}/>
              </div>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <Textfield label="Vehicle Brand" variant="outlined" onChange={(event)=>{setBrand(event.target.value)}}/>
                <Textfield label="Vehicle Model" variant="outlined" onChange={(event)=>{setModel(event.target.value)}}/>
              </div>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <Textfield label="Contact" type="number" variant="outlined" onChange={(event)=>{setContact(event.target.value)}}/>
                <Textfield label="Email" type="email" variant="outlined" onChange={(event)=>{setCustomerEmail(event.target.value)}}/>
              </div>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <Textfield label="Amount (in Rs.)" type="number" variant="outlined" onChange={(event)=>{setCost(event.target.value)}}/>
              </div>
              <TimePicker/>
              <div>
              <br />
                <label>Comments</label> <br />
                <textarea label="Comments" type="text" variant="outlined" onChange={(event)=>{setComments(event.target.value)}}/>
              </div>
              <FormGroup>
                {checkBoxes.map((checkbox) => (
                  <FormControlLabel
                    key={checkbox.id}
                    control={<Checkbox onChange={checkBoxHandler} value={checkbox.label} />}
                    label={checkbox.label}
                  />
                ))}
              </FormGroup>
              <ButtonCopy variant="contained" size="medium" children="Create Service" onClick={()=>{createService(localStorage.getItem("email"), owner, selectedCheckboxes, plate, brand, model, cost, contact, customerEmail, comments)}}/>
            </div>
        </div>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Service created successfully!
          </Alert>
        </Snackbar>
    </div>
  )
}

export default CreateService