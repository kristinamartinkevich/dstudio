import { Task } from "@/types";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks }: { tasks: Task[] }) => {
    return (
        <div className="grid gap-3 grid-cols-4">
            {tasks.map((task) =>
                <div key={task.id}>
                    <TaskItem task={task} />
                </div>)}
        </div>
    );
};

export default TaskList;
