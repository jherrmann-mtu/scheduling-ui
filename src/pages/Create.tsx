import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from 'react-hot-toast';
import type { AppointmentRequest } from '../api/ApiModel';
import ApiRequest from '../api/ApiRequest';
import { AuthContext } from '../api/AuthContext';
import AppointmentDisplay from '../components/AppointmentDisplay';
import './Create.css';

function nearestFiveMinute() {
    let date = new Date();
    date.setSeconds(0);
    date.setMilliseconds(0);
    date.setMinutes((5 - (date.getMinutes() % 5)) + date.getMinutes())
    return date;
}

function endTimeDefault() {
    return new Date(nearestFiveMinute().getTime() + 1000 * 60 * 60)
}

function Create() {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [location, setLocation] = useState("");
    const [start, setStart] = useState(nearestFiveMinute());
    const [end, setEnd] = useState(endTimeDefault());

    function getAppointmentRequestFromState() {
        return {
            name: name, 
            description: desc, 
            location: location, 
            start: start.getTime() / 1000, 
            end: end.getTime() / 1000,
            guests: [],
            isPublic: false
        } as AppointmentRequest
    }


    const { token } = useContext(AuthContext);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit() {
        try {
            await new ApiRequest("/schedule/create")
                .withMethod("POST")
                .withBody(JSON.stringify(getAppointmentRequestFromState()))
                .execute(token)
        } catch (err) {
            if (err instanceof Error)
                setError(err.message)
            return
        }

        toast.success("Appointment '" + name +  "' created.")

        setError("")
        setName("")
        setDesc("")
        setLocation("")
        setStart(nearestFiveMinute())
        setEnd(endTimeDefault())
    }

    function isValidStart(date : Date) : boolean {
        const epoch = date.getTime();
        return epoch > new Date().getTime() && epoch < end.getTime();
    }

    function isValidEndTime(date : Date) : boolean {
        return date.getTime() > start.getTime();
    }

    function isValidEnd(date : Date) : boolean {
        let epoch = date.getTime() / 1000;
        epoch = epoch - (epoch % 86400);

        let startEpoch = start.getTime() / 1000;
        startEpoch = startEpoch - (startEpoch % 86400)

        return epoch >= startEpoch;
    }

    return (
        <>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="title-box">
            <h1>Create Appointment</h1>
        </div>
        <div className="create-root">
            <div className="form">
                <label htmlFor="name">Name*</label>
                <input name="name" required  type="text" value={name} onChange={(event) => setName(event.target.value)} />

                <label htmlFor="description" >Description</label>
                <input name="description" type="text" value={desc} onChange={(event) => setDesc(event.target.value)} />

                <label htmlFor="location" >Location</label>
                <input name="location" type="text" value={location} onChange={(event) => setLocation(event.target.value)} />

                <label htmlFor="start" >Start time*</label>
                <DatePicker 
                    name="start"
                    showTimeSelect
                    inline 
                    timeIntervals={5} 
                    selected={start} 
                    onChange={(date : Date | null) => setStart(date == null ? new Date() : date)} 
                    filterDate={isValidStart}
                    filterTime={isValidStart}
                />

                <label htmlFor="end" >End time*</label>
                <DatePicker 
                    name="end"
                    showTimeSelect
                    inline
                    timeIntervals={5}
                    selected={end}
                    onChange={(date : Date | null) => setEnd(date == null ? new Date() : date)}
                    filterDate={isValidEnd}
                    filterTime={isValidEndTime}
                />

                <p>*Required</p>
                <button className="submit-button" type="submit" onClick={handleSubmit}>Create Appointment</button>
            </div>
            <div style={{height: "100%"}}>
                <AppointmentDisplay appointment={
                    getAppointmentRequestFromState()
                } />
                {error != null && 
                    <p className="error">{error}</p>
                }
            </div>
            
        </div>
        </>
    )
}

export default Create
