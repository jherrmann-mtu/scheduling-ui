import type { AppointmentRequest } from '../api/ApiModel';
import { getDateString, getTimeString } from '../api/TimeUtils';
import './AppointmentDisplay.css';

function AppointmentDisplay({ appointment }: { appointment: AppointmentRequest }) {
    return (
        <div className="appt-display">
            <h2>{appointment.name}</h2>
            <h3>{appointment.location}</h3>
            <p>{getDateString(appointment.start, appointment.end)}</p>
            <p>{getTimeString(appointment.start, appointment.end)}</p>
            <br />
            <p>{appointment.description}</p>
        </div>
    )
}

export default AppointmentDisplay
