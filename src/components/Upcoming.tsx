import './Upcoming.css'
import { useQuery } from '@tanstack/react-query';
import ApiRequest from '../api/ApiRequest';
import type { Appointment } from '../api/ApiModel';
import Spinner from '../components/common/Spinner';
import ErrorView from '../components/common/ErrorView';
import { AuthContext } from '../api/AuthContext';
import { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { epochTimeToDate, getDateString, getTimeString } from '../api/TimeUtils';

function ExpandableAppointment({ appointment }: { appointment: Appointment }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const detailsId = `appointment-${appointment.id}-details`;
    return (
        <Fragment>
            <tr>
                <th scope="row" className="row">
                    <button aria-expanded={isExpanded} aria-controls={detailsId} onClick={() => setIsExpanded((expanded) => !expanded)}>
                        <span aria-hidden="true">{isExpanded ? "- " : "+ "}</span>
                        {appointment.name}
                    </button>
                </th>
                <td className="row">{epochTimeToDate(appointment.start).toLocaleDateString()}</td>
                <td className="row">{appointment.location}</td>
                <td className="row">{appointment.description}</td>
            </tr>
            <tr id={detailsId} hidden={!isExpanded}>
                <td className="details-container" colSpan={4}>
                    <dl>
                        <dt>Appointment</dt>
                        <dd>{appointment.name}</dd>

                        <dt>Date</dt>
                        <dd>{getDateString(appointment.start, appointment.end)}</dd>

                        <dt>Location</dt>
                        <dd>{appointment.location}</dd>

                        <dt>Time</dt>
                        <dd>{getTimeString(appointment.start, appointment.end)}</dd>

                        <dt>Description</dt>
                        <dd>{appointment.description}</dd>

                        <dt>Guests</dt>
                        <dd>{appointment.guests}</dd>
                    </dl>
                </td>
            </tr>
        </Fragment>
    );
}

function Upcoming() {
    const { token } = useContext(AuthContext);

    const { data: upcoming, isLoading, error } = useQuery({
        queryKey: ["upcoming"],
        queryFn: async () => {
            const res = await new ApiRequest("/schedule/private/either").withParameter("limit", 10).execute(token);
            return res.json() as Promise<Appointment[]>
        }
    });

    if (isLoading) {
        return <Spinner />
    }
    if (error) {
        return <ErrorView title={error.name} msg={error.message} />
    }

    if (upcoming?.length === 0) {
        return (
            <div className="no-appt">
                <h2>No upcoming appointments</h2>
                <p>Appointments you have on your calendar in the future show up here</p>
                <Link to="/create">Create an appointment →</Link>
            </div>
        )
    }

    return (
        <div style={{ overflowX: "auto" }}>
            <table>
                <thead>
                    <tr>
                        <th scope="col" className="col">Appointment</th>
                        <th scope="col" className="col">Date</th>
                        <th scope="col" className="col">Location</th>
                        <th scope="col" className="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {upcoming?.map((appt) => <ExpandableAppointment key={appt.id} appointment={appt} />)}
                </tbody>
            </table>
        </div>
    );
}

export default Upcoming
