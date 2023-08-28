import React from 'react'
import { List, ListItemButton, ListItemText, ListItem, Box} from '@mui/material'
import './css_components/css_listView.css'

const ListView = () => {
  const create_service_clicked = () => {
    window.location.href="create_service"
  }

  const pending_services_clicked = () => {
    window.location.href="pending_services"
  }
  
  const in_progess_services_clicked = () => {
    window.location.href="in_progress_services"
  }

  const finished_services_clicked = () => {
    window.location.href="finished_services"
  }

  return (
    <div>
      <Box style={{maxWidth: 250}} className="box-container">
        <List>
        <ListItem disablePadding className='list'>
            <ListItemButton onClick={() => {create_service_clicked()}}>
              <ListItemText primary="Create Services" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className='list'>
            <ListItemButton onClick={() => {pending_services_clicked()}}>
              <ListItemText primary="Pending Services" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className='list'>
            <ListItemButton onClick={() => {in_progess_services_clicked()}}>
              <ListItemText primary="In-progress Services" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className='list'>
            <ListItemButton onClick={()=>{finished_services_clicked()}}>
              <ListItemText primary="Finished Services" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>
  )
}

export default ListView