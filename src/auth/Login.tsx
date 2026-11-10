import type { AuthRequest } from '../api/ApiModel';
import './Auth.css';
import type { AuthComponentProps } from './AuthPage';

function Login(props : AuthComponentProps) {
    async function handleSubmit(formData: FormData) {
        const body = {
            username: formData.get("username"),
            password: formData.get("password")
        } as AuthRequest;
        props.requestFunction("/auth/login", body);
    }

    return (
        <div className="auth-form-root">
            <h2>Login</h2>
            <form action={handleSubmit}>
                <label htmlFor="username" >Username</label>
                <input id="username" name="username" required />
                <label htmlFor="password" >Password</label>
                <input id="password" name="password" required type="password" />
                <button className="auth-submit" type="submit">Login</button>
            </form>
            <button className="auth-toggle" onClick={() => props.viewToggle()}>Create Account →</button>
            {props.error != null && 
                <p className="error">{props.error}</p>
            }
        </div>
    )
}

export default Login
