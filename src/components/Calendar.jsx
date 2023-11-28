import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function TrainingCalendar() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch('https://traineeapp.azurewebsites.net/gettrainings')
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error("Error in fetch: " + response.statusText);
      })
      .then(data => {
        setTrainings(data);
      })
      .catch(err => console.error(err));
  };

  const events = trainings.map(training => ({
    title: `${training.activity} - ${training.customer.firstname} ${training.customer.lastname}`, 
    start: new Date(training.date),
    end: moment(training.date).add(training.duration, 'minutes').toDate(),
  }));

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        style={{ padding: 10 }}
      />
    </div>
  );
}

export default TrainingCalendar;
