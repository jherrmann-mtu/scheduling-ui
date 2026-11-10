import type { AuthRequest } from '../api/ApiModel';
import './Auth.css';
import type { AuthComponentProps } from './AuthPage';

function CreateAccount(props: AuthComponentProps) {
    async function handleSubmit(formData: FormData) {
        const body = {
            username: formData.get("username"),
            password: formData.get("password")
        } as AuthRequest;

        props.requestFunction("/auth/create", body);
    }

    return (
        <div className="auth-form-root">
            <h2>Create Account</h2>
            <form action={handleSubmit}>
                <label htmlFor="username" >Username</label>
                <input id="username" name="username" required />
                <label htmlFor="password" >Password</label>
                <input id="password" name="password" required type="password" />
                <label htmlFor="password" >Confirm Password</label>
                <input id="password" name="password" required type="password" />
                <button className="auth-submit" type="submit">Create Account</button>
            </form>
            <button className="auth-toggle" onClick={() => props.viewToggle()}>Login →</button>
            {props.error != null && 
                <p className="error">{props.error}</p>
            }
        </div>
    )
}

export default CreateAccount
