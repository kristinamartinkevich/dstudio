import TaskItem from "./TaskItem";

import { Task } from "@/types";

const TaskList = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {tasks.map((task) => (
        <div key={task.id}>
          <TaskItem task={task} />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
