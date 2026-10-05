import { useState } from "react"
import "../styles/loginPage.css"

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alertError, setAlertError] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (!username || !password || !confirmPassword) {
            setAlertError("empty");
            return;
        }

        if (password.length < 6) {
            setAlertError("passwordError");
            return;
        }

        if (password !== confirmPassword) {
            setAlertError("passwordMismatch");
            return;
        }

        setAlertError("")
    }


    return (
        <div className="registerModal">
            <form className="registerForm" onSubmit={handleSubmit}>
                <h2>Create Account</h2>

                <label>Username</label>
                <input type="text" value={username} placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />

                <label>Password</label>
                <input type="password" value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />

                <label>Confirm Password</label>
                <input type="password" value={confirmPassword} placeholder="Confirm your password" onChange={(e) => setConfirmPassword(e.target.value)} />

                {alertError && (
                    <h2
                        style={{
                            color: "red",
                            fontSize: "12px"
                        }}
                    >
                        {alertError === "empty" && "Please fill in the missing fields!"}
                        {alertError === "passwordError" && "Password must be at least 6 characters."}
                        {alertError === "passwordMismatch" && "Passwords do not match."}
                    </h2>
                )}

                <button type="submit">Register</button>

                <p>Already have an account?{" "}<a href="/login">Login</a></p>
            </form>
        </div>
    );
}

export default Register;