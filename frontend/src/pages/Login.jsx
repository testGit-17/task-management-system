import { useState } from "react"
import "../styles/loginPage.css"
import { Link, useLocation, useNavigate } from "react-router-dom"
import api from "../api"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const registrationMessage = location.state?.message;

    async function handleSubmit(e) {
        e.preventDefault();

        if (!username.trim() || !password) {
            setError("Please enter your username and password.");
            return;
        }

        setError("");
        setSubmitting(true);

        try {
            const result = await api.post("/login", {
                username: username.trim(),
                password,
            });
            const token = result?.data?.token ?? result?.token;

            if (typeof token !== "string" || !token) {
                throw new Error("The server did not return an authentication token.");
            }

            localStorage.setItem("token", token);
            navigate(location.state?.from?.pathname || "/tasks", { replace: true });
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : "Unable to log in.");
        } finally {
            setSubmitting(false);
        }
    }


    return (
        <div className="registerModal">
            <form className="registerForm" onSubmit={handleSubmit}>
                <h2>Login</h2>

                <label htmlFor="login-username">Username</label>
                <input id="login-username" type="text" autoComplete="username" value={username} placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />

                <label htmlFor="login-password">Password</label>
                <input id="login-password" type="password" autoComplete="current-password" value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />

                {registrationMessage && <p role="status">{registrationMessage}</p>}

                {error && (
                    <h2
                        style={{
                            color: "red",
                            fontSize: "12px"
                        }}
                    >
                        {error}
                    </h2>
                )}

                <button type="submit" disabled={submitting}>{submitting ? "Logging in..." : "Login"}</button>

                <p>Don't have an account?{" "}<Link to="/register">Sign Up</Link></p>
            </form>
        </div>
    );
}

export default Login;