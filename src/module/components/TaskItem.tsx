import { Card, CardBody, CardFooter, CardHeader, Checkbox, Button, Modal, useDisclosure } from '@nextui-org/react';
import EditTask from './EditTask';
import { Task } from '@/types';
import { deleteTask, editTask } from '@/utils/apiService';
import { useProjectStore } from '@/store';
import { UTCToDate } from '@/utils/utils';

const TaskItem = ({ task }: { task: Task }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { setLoading, token } = useProjectStore();

    const changeCompletion = async (checked: boolean) => {
        setLoading(true);
        try {
            task.isCompleted = checked;
            await editTask(task.id, task, token);
        } catch (error: any) {
            console.error("Error updating todo completion:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader className="flex justify-between">
                <span className={task.isCompleted ? 'line-through' : ''}>{task.title} </span>
                <Checkbox isSelected={task.isCompleted}
                    onChange={(event) => changeCompletion(event.target.checked)} />
            </CardHeader>
            <CardBody>
                <p className='text-small text-slate-800'>
                    {task.description}
                </p>
            </CardBody>
            <CardFooter className="flex justify-between">
                <div className='text-slate-800 text-small'>
                    Due: {UTCToDate(task.dueDate)}
                </div>
                <Button
                    color="success"
                    type='button'
                    onPress={onOpen}
                    variant="flat"
                >
                    Edit
                </Button>
                <Button
                    color="danger"
                    type='button'
                    onPress={() => deleteTask(token, task.id)}
                    variant="flat"
                >
                    Delete
                </Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <EditTask todo={task} />
                </Modal>
            </CardFooter>
        </Card>
    );
};

export default TaskItem;
