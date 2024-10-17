import { Card, CardBody, CardFooter, CardHeader, Checkbox, Divider, Button, Modal, useDisclosure } from '@nextui-org/react';
import EditTask from './EditTask';
import { Task } from '@/types';
import { useState } from 'react';
import { editTask } from '@/utils/apiService';
import { useProjectStore } from '@/store';

const TaskItem = ({ task }: { task: Task }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isCompleted, setIsCompleted] = useState(task.isCompleted);
    const { setLoading, token } = useProjectStore();

    const dueDate = new Date(task.dueDate);

    const changeCompletion = async (checked: boolean) => {
        setIsCompleted(checked)
        setLoading(true);
        console.log(isCompleted)
        try {
            const updatedTask: Partial<Task> = {};
            if (isCompleted !== task.isCompleted) updatedTask.isCompleted = isCompleted;

            await editTask(task.id, updatedTask, token);
        } catch (error: any) {
            console.error("Error updating todo:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader className="flex justify-between">
                <span>{task.title} </span>
                <Checkbox isSelected={isCompleted}
                    onChange={(event) => changeCompletion(event.target.checked)} />
            </CardHeader>
            <Divider />
            <CardBody className='text-small text-muted'>
                {task.description}
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-between">
                <div>
                    Due: {dueDate.toDateString()}
                </div>
                <Button
                    type='button'
                    onPress={onOpen}
                >
                    Edit
                </Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <EditTask todo={task} />
                </Modal>
            </CardFooter>
        </Card>
    );
};

export default TaskItem;
