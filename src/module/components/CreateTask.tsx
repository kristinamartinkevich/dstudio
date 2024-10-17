import { useProjectStore } from '@/store';
import { Task } from '@/types';
import { createTask, generateUUID } from '@/utils/apiService';
import { getUTCTimestamp } from '@/utils/utils';
import { Button, Checkbox, Input, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormEvent, useState } from 'react';

const CreateTask = () => {
    const { token, setLoading } = useProjectStore();
    const [isCompleted, setIsCompleted] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        setLoading(true);
        try {
            const newTask: Task = {
                id: await generateUUID(),
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                isCompleted: isCompleted,
                dueDate: getUTCTimestamp(formData.get('dueDate') as string),
                createdAt: getUTCTimestamp(formData.get('createdAt') as string),
                updatedAt: getUTCTimestamp(formData.get('updatedAt') as string),
            };
            await createTask(token, newTask);
        } catch (error: any) {
            console.error("Error creating todo:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalContent>
            {(onClose) => (
                <form onSubmit={handleSubmit}>
                    <ModalHeader className="flex flex-col gap-1">Create Task</ModalHeader>
                    <ModalBody>
                        <div>
                            <Input
                                label="Title"
                                placeholder="Title"
                                type="text"
                                name="title"
                                required
                            />
                        </div>
                        <div className='my-4'>
                            <Input
                                label="Description"
                                placeholder="Description"
                                type="text"
                                name="description"
                                required
                            />
                        </div>
                        <div>
                            <Input
                                label="Due Date"
                                placeholder="Due Date"
                                type="date"
                                name="dueDate"
                                required
                                description="Due Date must be in the future"
                            />
                        </div>
                        <div className='my-4'>
                            <Input
                                label="Created At"
                                type="date"
                                name="createdAt"
                                required
                            />
                        </div>
                        <div>
                            <Input
                                label="Updated At"
                                type="date"
                                name="updatedAt"
                                required
                            />
                        </div>
                        <div className='my-4'>
                            <Checkbox
                                isSelected={isCompleted}
                                onChange={(event) => setIsCompleted(event.target.checked)}
                                name='isCompleted'
                                required>
                                Is completed
                            </Checkbox>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="flat" onPress={onClose}>
                            Close
                        </Button>
                        <Button color="primary" type="submit">Add Task</Button>
                    </ModalFooter>
                </form >
            )}
        </ModalContent>
    );
};

export default CreateTask;
