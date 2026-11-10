import { useContext, useState } from 'react'
import './Auth.css'
import CreateAccount from './CreateAccount';
import Login from './Login';
import type { AuthRequest, AuthResponse } from '../api/ApiModel';
import ApiRequest from '../api/ApiRequest';
import { getReasonPhrase } from 'http-status-codes';
import { AuthContext } from '../api/AuthContext';

export interface AuthComponentProps {
    viewToggle: Function,
    error: string | null,
    requestFunction: (endpoint: string, body: AuthRequest) => void
}

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const {setAuth} = useContext(AuthContext)

    async function request(endpoint: string, body: AuthRequest) {
        const res = await fetch(ApiRequest.BASE + endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).catch(() => setError("Failed to connect. Please try again later."));

        if (!res) {
            return
        }

        if (res.ok) {
            const token = await res.json() as AuthResponse;
            setError(null);
            setAuth(token.token);
        } else {
            const apiMsg = await res.json() as Error
            console.log(apiMsg)
            if (apiMsg) {
                console.error("API request to '" + endpoint + "' returned error response: " + getReasonPhrase(res.status) + " (" + res.status + "): " + apiMsg.message);
                setError(apiMsg.message);
            }else {
                setError(res.status + "");
            }
            
        }
    }

    function toggle() {
        setIsLogin(!isLogin);
        setError(null);
    }

    return <div className="auth-root">{isLogin ? <Login viewToggle={toggle} error={error} requestFunction={request} /> : <CreateAccount viewToggle={toggle} error={error} requestFunction={request} />}</div>
}

export default AuthPage
