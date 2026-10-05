import { useState } from "react"
import "../styles/loginPage.css"
import { Link, useNavigate } from "react-router-dom"
import api from "../api"

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!username.trim() || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError("");
        setSubmitting(true);

        try {
            await api.post("/register", {
                username: username.trim(),
                password,
            });
            navigate("/login", { state: { message: "Account created. Please log in." } });
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : "Unable to create your account.");
        } finally {
            setSubmitting(false);
        }
    }


    return (
        <div className="registerModal">
            <form className="registerForm" onSubmit={handleSubmit}>
                <h2>Create Account</h2>

                <label htmlFor="register-username">Username</label>
                <input id="register-username" type="text" autoComplete="username" value={username} placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />

                <label htmlFor="register-password">Password</label>
                <input id="register-password" type="password" autoComplete="new-password" value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />

                <label htmlFor="confirm-password">Confirm Password</label>
                <input id="confirm-password" type="password" autoComplete="new-password" value={confirmPassword} placeholder="Confirm your password" onChange={(e) => setConfirmPassword(e.target.value)} />

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

                <button type="submit" disabled={submitting}>{submitting ? "Registering..." : "Register"}</button>

                <p>Already have an account?{" "}<Link to="/login">Login</Link></p>
            </form>
        </div>
    );
}

export default Register;