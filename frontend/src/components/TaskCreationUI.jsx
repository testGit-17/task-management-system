import { useState } from "react"
import "../styles/taskCreationUI.css"

function TaskCreationUI({ task, onClose, onSubmit }) {
    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!title.trim()) {
            setError("Please enter a task title.");
            return;
        }

        setError("");
        setSubmitting(true);

        try {
            await onSubmit({
                title: title.trim(),
                description: description.trim(),
            });
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : "Unable to save this task.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="taskCreation">
            <form onSubmit={handleSubmit}>
                <h2>{task ? "Edit Task" : "Create Task"}</h2>

                <input type="text" aria-label="Task title" placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} />

                <input type="text" aria-label="Task description" placeholder="Task description" value={description} onChange={(e) => setDescription(e.target.value)} />

                {error && <p role="alert" style={{ color: "red", textAlign: "center" }}>{error}</p>}
                <button type="submit" disabled={submitting}>{submitting ? "Saving..." : task ? "Save Task" : "Create Task"}</button>
                <button type="button" onClick={onClose} disabled={submitting}>Cancel</button>
            </form>
        </div>
    );
}

export default TaskCreationUI;