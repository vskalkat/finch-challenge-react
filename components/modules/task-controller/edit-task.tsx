import { useState } from "react";
import { TaskDepsI, TaskI } from "./constants";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export const EditTask = ({ task, allTasks = {}, onEditTask = () => { }, onCancel = () => { } }: {
    task: TaskI;
    allTasks?: TaskI;
    onEditTask?: (task: TaskI) => void;
    onCancel?: () => void;
}) => {
    const [taskName, setTaskName] = useState<string>(Object.keys(task)[0]);
    const [dependencies, setDependencies] = useState<TaskDepsI[]>(task[Object.keys(task)[0]]);
    const [newDependencyTaskName, setNewDependencyTaskName] = useState<string>("");
    const [newDependencyTimePassed, setNewDependencyTimePassed] = useState<number>(0);

    const handleSubmit = () => {
        if (!taskName) {
            alert("Missing task name");
            return;
        }

        onEditTask({
            [taskName]: dependencies,
        });
    }

    const handleAddDependency = (task_name: string, time_passed: number) => {
        // converts time_passed from days to milliseconds because that's the unit we use for consistent storage
        setDependencies([...dependencies, { task_name, time_passed: time_passed * 1000 * 60 * 60 * 24 }]);
    }

    const handleRemoveDependency = (index: number) => {
        setDependencies(dependencies.filter((_, i) => i !== index));
    }

    const convertTimePassedToDays = (time_passed: number) => {
        return Math.floor(time_passed / (1000 * 60 * 60 * 24));
    }

    return (
        <Modal isOpen={true} onClose={onCancel} title="Edit task">
            <form onSubmit={e => {
                e.preventDefault();
                handleSubmit();
            }}>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="task-name" className="text-sm font-medium">Task name</label>
                        <input disabled type="text" id="task-name" className="p-2 rounded-md border border-gray-300 opacity-50 cursor-not-allowed" placeholder="Ex. Follow up call"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div>
                            <label className="text-sm font-medium">Current dependencies</label>
                            {!dependencies.length && <div className="text-gray-500">No dependencies</div>}
                        </div>

                        <div className="flex flex-col gap-2">
                            {dependencies.map((d, i) => (
                                <div key={i} className="flex justify-between gap-2 items-center">
                                    <div>{d.task_name}</div>
                                    <div>{convertTimePassedToDays(d.time_passed)} days</div>
                                    <Button type="button" className="bg-red-500 hover:bg-red-600 text-white" onClick={() => handleRemoveDependency(i)}>Remove</Button>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-300 py-4 border-b flex flex-col gap-2 my-4 justify-between">
                            <label className="text-sm font-medium">Attach new dependency</label>

                            <div className="flex gap-2 items-end justify-between">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium">Task name</label>
                                    <select className="p-2 rounded-md border border-gray-300"
                                        value={newDependencyTaskName}
                                        onChange={(e) => setNewDependencyTaskName(e.target.value)}
                                    >
                                        {Object.keys(allTasks).map((t) => (
                                            <option disabled={dependencies.some(d => d.task_name === t) || t === taskName} key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium">Time passed (days)</label>
                                    <input type="number" className="p-2 rounded-md border w-[80px] border-gray-300" placeholder="Ex. 7"
                                        value={newDependencyTimePassed} min={0}
                                        onChange={(e) => setNewDependencyTimePassed(Number(e.target.value))}
                                    />
                                </div>

                                <Button type="button" onClick={() => handleAddDependency(newDependencyTaskName, newDependencyTimePassed)}>Add</Button>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-8">
                    <button className="text-white px-4 py-2 rounded-md cursor-pointer w-fit hover:bg-gray-600" type="button" onClick={onCancel}>Cancel</button>
                    <Button type="submit">Save changes</Button>
                </div>
            </form>
        </Modal>
    );
}