import { useState } from "react"
import "../styles/loginPage.css"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alertError, setAlertError] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (!username || !password || !confirmPassword) {
            setAlertError("empty");
            return;
        }

        setAlertError("")
    }


    return (
        <div className="registerModal">
            <form className="registerForm" onSubmit={handleSubmit}>
                <h2>Login</h2>

                <label>Username</label>
                <input type="text" value={username} placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />

                <label>Password</label>
                <input type="password" value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />

                {alertError && (
                    <h2
                        style={{
                            color: "red",
                            fontSize: "12px"
                        }}
                    >
                        {alertError === "empty" && "Please fill in the missing fields!"}
                        {alertError === "invalid" && "Invalid username or password!"}
                    </h2>
                )}

                <button type="submit">Login</button>

                <p>Don't have an account?{" "}<a href="/register">Sign Up</a></p>
            </form>
        </div>
    );
}

export default Login;