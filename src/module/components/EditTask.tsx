import { FormEvent, useState } from 'react';
import { editTask } from '@/utils/apiService';
import { Button, Checkbox, Input, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useProjectStore } from '@/store';
import { getUTCTimestamp } from '@/utils/utils';
import { Task } from '@/types';

const EditTask = ({ todo }: { todo: Task }) => {
    const { setLoading, token } = useProjectStore();
    const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        setLoading(true);

        try {
            const updatedTask: Partial<Task> = {};
            if (formData.get('title') !== todo.title) updatedTask.title = formData.get('title');
            if (formData.get('description') !== todo.description) updatedTask.description = formData.get('description');
            if (isCompleted !== todo.isCompleted) updatedTask.isCompleted = isCompleted;
            if (formData.get('dueDate') !== todo.dueDate) updatedTask.dueDate = getUTCTimestamp(formData.get('dueDate') as string);
            if (formData.get('createdAt') !== todo.createdAt) updatedTask.createdAt = getUTCTimestamp(formData.get('dueDate') as string);
            if (formData.get('updatedAt') !== todo.updatedAt) updatedTask.updatedAt = getUTCTimestamp(formData.get('updatedAt') as string);

            await editTask(todo.id, updatedTask, token);
        } catch (error: any) {
            console.error("Error updating todo:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalContent>
            {(onClose) => (
                <form onSubmit={handleSubmit}>
                    <ModalHeader className="flex flex-col gap-1">Create a Task</ModalHeader>
                    <ModalBody>
                        <div>
                            <Input
                                label="Title"
                                placeholder="Title"
                                type="text"
                                name="title"
                            />
                        </div>
                        <div className='my-4'>
                            <Input
                                label="Description"
                                placeholder="Description"
                                type="text"
                                name="description"
                            />
                        </div>
                        <div>
                            <Checkbox
                                name="isCompleted"
                                isSelected={isCompleted}
                                onChange={(event) => setIsCompleted(event.target.checked)}
                            >
                                isCompleted
                            </Checkbox>
                        </div>
                        <div className='my-4'>
                            <Input
                                label="Due Date"
                                placeholder="Due Date"
                                type="date"
                                name="dueDate"
                            />
                        </div>
                        <div>
                            <Input
                                label="Created At"
                                type="date"
                                name="createdAt"
                            />
                        </div>
                        <div className='my-4'>
                            <Input
                                label="Updated At"
                                type="date"
                                name="updatedAt"
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
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
