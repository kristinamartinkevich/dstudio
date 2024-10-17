import { FormEvent, useState } from 'react';
import { Button, Checkbox, Input, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useProjectStore } from '@/store';
import { getUTCTimestamp, UTCToDate } from '@/utils/utils';
import { Task } from '@/types';
import { editTask } from '@/utils/apiService';

const EditTask = ({ todo }: { todo: Task }) => {
    const { setLoading, token } = useProjectStore();
    const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);
        setLoading(true);

        try {
            const updatedTask: Partial<Task> = {};
            if (formData.get('title') !== todo.title) updatedTask.title = formData.get('title');
            if (formData.get('description') !== todo.description) updatedTask.description = formData.get('description');
            if (isCompleted !== todo.isCompleted) updatedTask.isCompleted = isCompleted;
            if (formData.get('dueDate') !== todo.dueDate) updatedTask.dueDate = getUTCTimestamp(formData.get('dueDate'));
            if (formData.get('createdAt') !== todo.createdAt) updatedTask.createdAt = getUTCTimestamp(formData.get('dueDate'));
            if (formData.get('updatedAt') !== todo.updatedAt) updatedTask.updatedAt = getUTCTimestamp(formData.get('updatedAt'));

            await editTask(todo.id, updatedTask, token);
        } catch (error) {
            console.error("Error updating todo:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalContent>
            {(onClose) => (
                <form onSubmit={handleSubmit}>
                    <ModalHeader className="flex flex-col gap-1">Edit a Task</ModalHeader>
                    <ModalBody>
                        <div>
                            <Input
                                label="Title"
                                placeholder="Title"
                                type="text"
                                name="title"
                                defaultValue={todo.title}
                            />
                        </div>
                        <div className='my-4'>
                            <Input
                                label="Description"
                                placeholder="Description"
                                type="text"
                                name="description"
                                defaultValue={todo.description}
                            />
                        </div>
                        <div>
                            <Checkbox
                                name="isCompleted"
                                defaultSelected={todo.isCompleted}
                                onChange={(event) => setIsCompleted(event.target.checked)}>
                                isCompleted
                            </Checkbox>
                        </div>
                        <div className='my-4'>
                            <Input
                                label="Due Date"
                                placeholder="Due Date"
                                type="date"
                                name="dueDate"
                                defaultValue={UTCToDate(todo.dueDate)}
                            />
                        </div>
                        <div>
                            <Input
                                label="Created At"
                                type="date"
                                name="createdAt"
                                defaultValue={UTCToDate(todo.createdAt)}
                            />
                        </div>
                        <div className='my-4'>
                            <Input
                                label="Updated At"
                                type="date"
                                name="updatedAt"
                                defaultValue={UTCToDate(todo.updatedAt)}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="flat" onPress={onClose}>
                            Close
                        </Button>
                        <Button color="primary" type="submit"> Update Task</Button>
                    </ModalFooter>
                </form >
            )}
        </ModalContent>

    );
};

export default EditTask;
