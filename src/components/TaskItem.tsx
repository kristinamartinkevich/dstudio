import EditTaskPage from '@/pages/EditTaskPage';
import { Card, CardBody, CardFooter, CardHeader, Checkbox, Divider, Button, Modal, useDisclosure } from '@nextui-org/react';

const TaskItem = ({ task }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const dueDate = new Date(task.dueDate);
    return (
        <Card>
            <CardHeader className="flex justify-between">
                <span>{task.title} </span>
                <Checkbox isSelected={task.isCompleted} />
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
                    <EditTaskPage id={task.id} />
                </Modal>
            </CardFooter>
        </Card>
    );
};

export default TaskItem;
