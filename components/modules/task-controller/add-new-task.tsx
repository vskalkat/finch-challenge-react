import { useState } from "react";
import { TaskI } from "./constants";

export const AddNewTask = ({ onAddTask = () => { }, onCancel = () => { } }: {
    onAddTask?: (task: TaskI) => void;
    onCancel?: () => void;
}) => {
    const [taskName, setTaskName] = useState("");

    const handleAddTask = () => {
        if (!taskName) {
            alert("Please fill in a task name");
            return;
        }

        const newTask: TaskI = {
            [taskName]: [],
        };

        onAddTask(newTask);
    }

    return (
        <div className="border border-gray-300 rounded-md p-6 bg-white/10 my-10">
            <form
                onSubmit={e => {
                    e.preventDefault();
                    handleAddTask();
                }}
            >
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="task-name" className="text-sm font-medium">Task name</label>
                        <input type="text" id="task-name" className="p-2 rounded-md border border-gray-300" placeholder="Ex. Follow up call"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button className="text-white px-4 py-2 rounded-md cursor-pointer w-fit hover:bg-gray-600" onClick={onCancel}>Cancel</button>

                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer w-fit" onClick={handleAddTask}>Add task</button>
                    </div>
                </div>
            </form>
        </div>
    );
}