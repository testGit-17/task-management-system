import { useState } from "react"
import TaskCreationUI from "../components/TaskCreationUI"
import TaskListUI from "../components/TaskListUI"

function Tasks() {
    const [showCreation, setShowCreation] = useState(false);

    return (
        <>
            <TaskListUI onAdd={() => setShowCreation(true)} />

            {showCreation && (
                <TaskCreationUI onClose={() => setShowCreation(false)} />
            )}
        </>
    )
}

export default Tasks;