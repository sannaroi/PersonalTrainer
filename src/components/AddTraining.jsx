import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


export default function AddTraining({ fetchTrainings }) {
  const [training, setTraining] = useState({
    activity: '',
    date: null,
    duration: '',
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveCustomer = () => {
    fetch('https://traineeapp.azurewebsites.net/api/training', {
      method: 'POST',
      headers: { 'Content-type':'application/json' },
      body: JSON.stringify(training) 
    })
    .then(response => {
      if (!response.ok)
        throw new Error("Error when adding car: "  + response.statusText);

      fetchTrainings();
    })
    .catch(err => console.error(err));

    handleClose();
  }

  return (
    <div>
      <Button variant="text" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Activity"
            fullWidth
            variant="standard"
            value={training.activity}
            onChange={event => setTraining({...training, activity: event.target.value})}
          />
          <TextField
            margin="dense"
            label="Date"
            fullWidth
            variant="standard"
            value={training.date}
            onChange={event => setTraining({...training, date: event.target.value})}
          />
      
          <TextField
            margin="dense"
            label="Duration"
            fullWidth
            variant="standard"
            value={training.duration}
            onChange={event => setTraining({...training, duration: event.target.value})}
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