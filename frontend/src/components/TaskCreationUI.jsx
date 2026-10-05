import { useState } from "react"
import "../styles/taskCreationUI.css"

function TaskCreationUI() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        console.log({
            title,
            description
        });
    }

    return (
        <div className="taskCreation">
            <form onSubmit={handleSubmit}>
                <h2>Create Task</h2>

                <input type="text" placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} />

                <input type="text" placeholder="Task description" value={description} onChange={(e) => setDescription(e.target.value)} />

                <button type="submit">Create Task</button>
            </form>
        </div>
    );
}

export default TaskCreationUI;