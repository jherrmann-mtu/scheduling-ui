import './ErrorView.css'

interface ErrorViewProps {
    title : string
    msg : string
}

function ErrorView(props : ErrorViewProps) {
    return (
        <div className="err">
            <h2>{props.title}</h2>
            <p>{props.msg}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
        </div>
    )
}

export default ErrorView
