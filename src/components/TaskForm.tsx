import { useProjectStore } from '@/store';
import { createTodo } from '@/utils/apiService';
import { getUTCTimestamp } from '@/utils/utils';
import { Button, Checkbox, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import axios from 'axios';

const TaskForm = () => {
    const { token, setLoading } = useProjectStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        setLoading(true);

        try {
            const newTask = {
                id: (await axios.get('https://www.uuidgenerator.net/api/version1')).data,
                title: formData.get('title'),
                description: formData.get('description'),
                isCompleted: !!formData.get('isCompleted'),
                dueDate: getUTCTimestamp(formData.get('dueDate')),
                createdAt: getUTCTimestamp(formData.get('createdAt')),
                updatedAt: getUTCTimestamp(formData.get('updatedAt')),
            };
            await createTodo(token, newTask);
        } catch (error) {
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
                        <div >
                            <Checkbox name='isCompleted'>isCompleted</Checkbox>
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
                        <Button color="primary" type="submit">Add Task</Button>
                    </ModalFooter>
                </form >
            )}
        </ModalContent>
    );
};

export default TaskForm;
