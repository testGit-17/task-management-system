import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskCreationUI from "../components/TaskCreationUI"
import TaskListUI from "../components/TaskListUI"
import api from "../api"

async function fetchTasks() {
    const result = await api.get("/tasks");
    const taskList = result?.data?.data ?? result?.data ?? result;

    if (!Array.isArray(taskList)) {
        throw new Error("The server returned an invalid task list.");
    }

    return taskList;
}

function Tasks() {
    const [showCreation, setShowCreation] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const loadTasks = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            setTasks(await fetchTasks());
        } catch (loadError) {
            setError(loadError instanceof Error ? loadError.message : "Unable to load tasks.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let active = true;

        fetchTasks()
            .then((taskList) => {
                if (active) {
                    setTasks(taskList);
                }
            })
            .catch((loadError) => {
                if (active) {
                    setError(loadError instanceof Error ? loadError.message : "Unable to load tasks.");
                }
            })
            .finally(() => {
                if (active) {
                    setLoading(false);
                }
            });

        return () => {
            active = false;
        };
    }, []);

    async function handleSaveTask(taskDetails) {
        if (editingTask) {
            const id = editingTask.id ?? editingTask._id;
            if (id === undefined || id === null) {
                throw new Error("This task is missing its ID and cannot be edited.");
            }
            await api.put(`/tasks/${encodeURIComponent(id)}`, taskDetails);
        } else {
            await api.post("/tasks", taskDetails);
        }

        setShowCreation(false);
        setEditingTask(null);
        await loadTasks();
    }

    async function handleDeleteTask(task) {
        const id = task.id ?? task._id;
        if (id === undefined || id === null) {
            setError("This task is missing its ID and cannot be deleted.");
            return;
        }

        if (!window.confirm(`Delete "${task.title}"?`)) {
            return;
        }

        setError("");
        try {
            await api.delete(`/tasks/${encodeURIComponent(id)}`);
            setTasks((currentTasks) => currentTasks.filter((item) => (item.id ?? item._id) !== id));
        } catch (deleteError) {
            setError(deleteError instanceof Error ? deleteError.message : "Unable to delete this task.");
        }
    }

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
    }

    return (
        <>
            <TaskListUI
                tasks={tasks}
                loading={loading}
                error={error}
                onAdd={() => {
                    setEditingTask(null);
                    setShowCreation(true);
                }}
                onEdit={(task) => {
                    setEditingTask(task);
                    setShowCreation(true);
                }}
                onDelete={handleDeleteTask}
                onLogout={handleLogout}
            />

            {showCreation && (
                <TaskCreationUI
                    task={editingTask}
                    onSubmit={handleSaveTask}
                    onClose={() => {
                        setShowCreation(false);
                        setEditingTask(null);
                    }}
                />
            )}
        </>
    )
}

export default Tasks;