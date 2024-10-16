import TaskItem from "./TaskItem";

const TaskList = ({ tasks }) => {
    return (
        <div className="grid gap-3 grid-cols-4">
            {tasks.length > 0 ? (
                tasks.map((task) =>
                    <div key={task.id}>
                        <TaskItem task={task} />
                    </div>)
            ) : (
                <p>No tasks available.</p>
            )}
        </div>
    );
};

export default TaskList;
