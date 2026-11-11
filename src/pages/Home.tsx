import BigLink from '../components/common/BigLink';
import Upcoming from '../components/Upcoming';
import './Home.css';

function Home() {
    return (
        <div className="home-root">
            <h1>Home</h1>
            <div className="home-links">
                <BigLink title="Book Appointment" caption="Book a new appointment with another user" href="/book" />
                <BigLink title="Create Appointment" caption="Create new appointments" href="/create" />
                <BigLink title="Calendar" caption="View your existing appointments, past and present" href="/create" />
            </div>
            <div className="rule"></div>
            <div className="upcoming-container">
                <Upcoming />
            </div>
        </div>
    )
}

export default Home
