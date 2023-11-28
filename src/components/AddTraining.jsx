import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';


export default function AddTraining({ fetchTrainings, data }) {
  const [training, setTraining] = useState({
    activity: '',
    date: null,
    duration: '',
    customer: data.links[0].href
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (date) => {
    setTraining({ ...training, date: dayjs(date).format() });
  };

  const saveCustomer = () => {
    fetch('https://traineeapp.azurewebsites.net/api/trainings', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(training)
    })
      .then(response => {
        if (!response.ok)
          throw new Error("Error when adding training: " + response.statusText);

        fetchTrainings();
      })
      .catch(err => console.error(err));

    handleClose();
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>
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
            onChange={event => setTraining({ ...training, activity: event.target.value })}
          />
          <TextField
            margin="dense"
            label="Duration"
            fullWidth
            variant="standard"
            value={training.duration}
            onChange={event => setTraining({ ...training, duration: event.target.value })}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={training.date}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveCustomer}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}