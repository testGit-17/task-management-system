import { useEffect, useState } from "react"
import "../styles/taskListUI.css"

function TaskListUI({ onAdd }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getTasks() {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch("http://localhost:5000/api/tasks", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (!response.ok) {
                    setError("Failed to load tasks.");
                    return;
                }

                setTasks(data.data);
            } catch (error) {
                setError("Unable to connect to the server.");
            } finally {
                setLoading(false);
            }
        }

        getTasks();
    }, []);

    return (
        <div className="taskList">
            <h2>Tasks</h2>

            <button onClick={onAdd}>Add Task</button>

            {loading && <p>Loading tasks...</p>}

            {error && <p>{error}</p>}

            <div className="taskGrid">
                {tasks.map((task) => (
                    <div className="taskBox" key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>

                        <div className="taskActions">
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskListUI;