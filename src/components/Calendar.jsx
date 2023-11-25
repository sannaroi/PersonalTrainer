import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const TrainingCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchTrainingData();
  }, []);

  const fetchTrainingData = () => {
    fetch('https://traineeapp.azurewebsites.net/api/customers')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching customer data');
        }
        return response.json();
      })
      .then(customerData => {
        const customerMap = {};
        customerData.content.forEach(customer => {
          customerMap[customer.id] = `${customer.firstname} ${customer.lastname}`;
        });
        
        fetch('https://traineeapp.azurewebsites.net/api/trainings')
          .then(response => {
            if (!response.ok) {
              throw new Error('Error fetching training data');
            }
            return response.json();
          })
          .then(trainingData => {
            const events = trainingData.content.map(training => ({
              title: `${customerMap[training.customerId]}: ${training.activity}`,
              start: new Date(training.date),
              end: new Date(training.date), 
            }));
            setEvents(events);
          })
          .catch(error => {
            console.error('Error fetching training data:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching customer data:', error);
      });
  };

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};

export default TrainingCalendar;
