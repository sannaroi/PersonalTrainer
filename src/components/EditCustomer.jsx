import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import ModeIcon from '@mui/icons-material/Mode';


export default function EditCustomer({ fetchCustomers, data }) {
  const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    streetaddress: '',
    postcode: '',
    city: '',
    email: '',
    phone: ''
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setCustomer({
      firstname: data.firstname,
      lastname: data.lastname,
      streetaddress: data.streetaddress,
      postcode: data.postcode,
      city: data.city,
      email: data.email,
      phone: data.phone
    });

    console.log(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveCustomer = () => {
    fetch(data.links[0].href, {
      method: 'PUT',
      headers: { 'Content-type':'application/json' },
      body: JSON.stringify(customer) 
    })
    .then(response => {
      if (!response.ok)
        throw new Error("Error when adding customer: "  + response.statusText);

      fetchCustomers();
    })
    .catch(err => console.error(err));

    handleClose();
  }

  return (
    <div>
      <IconButton size="small" onClick={handleClickOpen}>
        <ModeIcon fontSize="small" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
        <TextField
            margin="dense"
            label="Firstname"
            fullWidth
            variant="standard"
            value={customer.firstname}
            onChange={event => setCustomer({...customer, firstname: event.target.value})}
          />
        <TextField
            margin="dense"
            label="Lastname"
            fullWidth
            variant="standard"
            value={customer.lastname}
            onChange={event => setCustomer({...customer, lastname: event.target.value})}
          />
        <TextField
            margin="dense"
            label="Street address"
            fullWidth
            variant="standard"
            value={customer.streetaddress}
            onChange={event => setCustomer({...customer, streetaddress: event.target.value})}
          />
        <TextField
            margin="dense"
            label="Postcode"
            fullWidth
            variant="standard"
            value={customer.postcode}
            onChange={event => setCustomer({...customer, postcode: event.target.value})}
          />
        <TextField
            margin="dense"
            label="City"
            fullWidth
            variant="standard"
            value={customer.city}
            onChange={event => setCustomer({...customer, city: event.target.value})}
          />
         <TextField
            margin="dense"
            label="Email"
            fullWidth
            variant="standard"
            value={customer.email}
            onChange={event => setCustomer({...customer, email: event.target.value})}
          />
        <TextField
            margin="dense"
            label="Phone"
            fullWidth
            variant="standard"
            value={customer.phone}
            onChange={event => setCustomer({...customer, phone: event.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveCustomer}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}