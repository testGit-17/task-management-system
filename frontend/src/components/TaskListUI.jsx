import "../styles/TaskListUI.css"

function TaskListUI({ tasks, loading, error, onAdd, onEdit, onDelete, onLogout }) {
    return (
        <div className="taskList">
            <h2>Tasks</h2>

            <button onClick={onAdd}>Add Task</button>
            <button onClick={onLogout}>Log Out</button>

            {loading && <p>Loading tasks...</p>}
            {error && <p role="alert">{error}</p>}

            <div className="taskGrid">
                {tasks.map((task) => (
                    <div className="taskBox" key={task.id ?? task._id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>

                        <div className="taskActions">
                            <button onClick={() => onEdit(task)}>Edit</button>
                            <button onClick={() => onDelete(task)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {!loading && !error && tasks.length === 0 && <p>No tasks yet. Add a task to get started.</p>}
        </div>
    );
}

export default TaskListUI;
