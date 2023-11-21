import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const TrainingCalendar = () => {
    const events = [
      {
        title: 'Esimerkki Tapahtuma',
        start: new Date(2023, 10, 10), // Aloituspäivä (vuosi, kuukausi, päivä)
        end: new Date(2023, 10, 12), // Lopetuspäivä (vuosi, kuukausi, päivä)
      },
    ];

  return (
    <BigCalendar
    localizer={localizer}
    events={events}
    defaultView="month"
    selectable
    style={{ margin: '50px' }}
    />
  );
};

export default TrainingCalendar;
