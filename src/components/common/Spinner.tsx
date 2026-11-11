import './Spinner.css'

function Spinner() {
    return (
        <div className="spinner">

            <svg height="30%" width="30%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff6a00" />
                        <stop offset="100%" stopColor="#7a2cff" />
                    </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="40" stroke="url(#circleGradient)" strokeWidth="10" fill="none" />
            </svg>
        </div>
    )
}

export default Spinner
