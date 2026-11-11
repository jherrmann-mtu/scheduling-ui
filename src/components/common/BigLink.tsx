import { useNavigate } from 'react-router-dom';
import './BigLink.css';

interface BigLinkProps {
    href: string
    title: string
    caption: string
}

function BigLink(props : BigLinkProps) {
    const navigate = useNavigate();
    
    function redirect() {
        navigate(props.href)
    }

    return (
        <div className="big-link" onClick={redirect}>
            <h2>{props.title}</h2>
            <h2 className="big-link-arrow">🡆</h2>
            <p>{props.caption}</p>
        </div>
    )
}

export default BigLink
