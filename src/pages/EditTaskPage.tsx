import { useEffect, useState } from 'react';
import { editTodo, fetchTodoById } from '@/utils/apiService';
import { Button, Checkbox, Input, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useProjectStore } from '@/store';
import { getUTCTimestamp } from '@/utils/utils';

const EditTaskPage = ({ id }) => {
    const { setLoading, token } = useProjectStore();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [dueDate, setDueDate] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [updatedAt, setUpdatedAt] = useState('');

    useEffect(() => {
        const fetchTask = async () => {
            setLoading(true);
            try {
                const response = await fetchTodoById(id, token);
                const todo = response.data;

                setTitle(todo.title);
                setDescription(todo.description);
                setIsCompleted(todo.isCompleted);
                setDueDate(todo.dueDate);
                setCreatedAt(todo.createdAt);
                setUpdatedAt(todo.updatedAt);
            } catch (error) {
                console.error("Error fetching todo:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const updatedTask = {
                id,
                title,
                description,
                isCompleted,
                dueDate: getUTCTimestamp(dueDate),
                createdAt: getUTCTimestamp(createdAt),
                updatedAt: getUTCTimestamp(updatedAt),
            };

            await editTodo(id, updatedTask);
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
                    <ModalHeader className="flex flex-col gap-1">Create Task</ModalHeader>
                    <ModalBody>
                        <div>
                            <Input
                                label="Title"
                                placeholder="Title"
                                type="text"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className='my-4'>
                            <Input
                                label="Description"
                                placeholder="Description"
                                type="text"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div>
                            <Checkbox
                                name="isCompleted"
                                isSelected={isCompleted}
                                onChange={() => setIsCompleted(!isCompleted)}
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
                                value={dueDate?.split('T')[0]}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <Input
                                label="Created At"
                                type="date"
                                name="createdAt"
                                value={createdAt?.split('T')[0]}
                                onChange={(e) => setCreatedAt(e.target.value)}
                            />
                        </div>
                        <div className='my-4'>
                            <Input
                                label="Updated At"
                                type="date"
                                name="updatedAt"
                                value={updatedAt?.split('T')[0]}
                                onChange={(e) => setUpdatedAt(e.target.value)}
                            />
                        </div>
                        <Button color="primary" type="submit">
                            Update Task
                        </Button>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Close
                        </Button>
                        <Button color="primary" type="submit">Edit</Button>
                    </ModalFooter>
                </form >
            )}
        </ModalContent>

    );
};

export default EditTaskPage;
