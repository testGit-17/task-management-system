import { useState } from "react"
import "../styles/loginPage.css"
import { useNavigate } from "react-router-dom"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alertError, setAlertError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!username || !password) {
            setAlertError("empty");
            return;
        }

        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await response.json();
        if (response.ok) {
            navigate("/tasks")
            localStorage.setItem("token", data.data.token)
            setAlertError("")
        } else {
            setAlertError("invalid")
        }

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