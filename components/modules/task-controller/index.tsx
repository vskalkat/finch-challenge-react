import { useState } from "react";
import { AddNewTask } from "./add-new-task";
import { DEFAULT_TASKS_CONFIG, TaskI } from "./constants";
import { EditTask } from "./edit-task";


export const TaskController = () => {
  const [tasks, setTasks] = useState<TaskI>(DEFAULT_TASKS_CONFIG);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Record<string, Date>>({});
  const [editingTask, setEditingTask] = useState<TaskI | null>(null);

  const handleCancel = () => {
    setIsAddingTask(false);
  }

  const handleAddTask = (task: TaskI) => {
    setTasks((prevTasks) => ({ ...prevTasks, ...task }));
    setIsAddingTask(false);
  }

  const handleEditTask = (task: TaskI) => {
    setTasks((prevTasks) => ({ ...prevTasks, ...task }));
    setEditingTask(null);
  }

  const handleRunTask = (taskName: string): boolean => {
    if (Object.keys(completedTasks).includes(taskName)) {
      console.log(`Task ${taskName} already completed`);
      return true;
    }

    for (const taskDep of tasks[taskName]) {
      if (!Object.keys(completedTasks).includes(taskDep.task_name)) {
        alert(`Task ${taskName} not ready - dependency ${taskDep.task_name} not met`);
        console.log(`Task ${taskName} not ready - dependency ${taskDep.task_name} not met`);
        return false;
      }

      const timeSinceDependencyCompletion = new Date().getTime() - new Date(completedTasks[taskDep.task_name]).getTime();

      if (timeSinceDependencyCompletion < taskDep.time_passed) {
        alert(`Task ${taskName} not ready - dependency ${taskDep.task_name} completed too recently`);
        console.log(`Task ${taskName} not ready - dependency ${taskDep.task_name} completed too recently`);
        return false;
      }
    }

    setCompletedTasks((prevCompletedTasks) => ({ ...prevCompletedTasks, [taskName]: new Date() }));
    return true;
  }

  const completedTaskNames = Object.keys(completedTasks);

  return (
    <div>
      <div className="flex justify-between mb-6 items-center w-full">
        <h1 className="text-lg font-bold">Tasks</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer w-fit" onClick={() => setIsAddingTask(true)}>Add task</button>
      </div>

      {isAddingTask && <AddNewTask onAddTask={handleAddTask} onCancel={handleCancel} />}

      {editingTask && <EditTask task={editingTask} allTasks={tasks} onEditTask={handleEditTask} onCancel={() => setEditingTask(null)} />}

      <div className="flex flex-col gap-3">
        {Object.keys(tasks).map((taskName) => (
          <div key={taskName} className="border border-gray-300 rounded-md p-3 flex justify-between gap-14">
            <div>
              <h2 className="text-lg font-bold">{taskName}</h2>
            </div>

            <div className="flex gap-2">
              <div>
                <button
                  className="text-white px-4 py-2 rounded-md cursor-pointer bg-gray-500 w-fit hover:bg-gray-600"
                  onClick={() => setEditingTask({ [taskName]: tasks[taskName] })}>
                  Edit
                </button>
              </div>

              <button
                className={`${completedTaskNames.includes(taskName) ? "bg-green-500" : "bg-blue-500"} text-white px-4 py-2 rounded-md cursor-pointer w-fit`}
                onClick={() => handleRunTask(taskName)}>
                {completedTaskNames.includes(taskName) ? "Completed" : "Run"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div >
  );
};