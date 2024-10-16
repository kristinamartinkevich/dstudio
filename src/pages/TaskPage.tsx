import { useEffect } from 'react';
import { fetchTasks } from '@/utils/apiService';
import { useProjectStore } from '@/store';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { Button, Modal, useDisclosure } from '@nextui-org/react';


const TaskPage = () => {
    const { tasks, setTasks, token } = useProjectStore();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const fetchData = async () => {
        const response = await fetchTasks(token);
        setTasks(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="flex mb-3 justify-between">
                <h1>Task Manager</h1>
                <Button onPress={onOpen}>Create a todo</Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={fetchData}>
                    <TaskForm />
                </Modal>
            </div>
            <TaskList tasks={tasks} />
        </>
    );
};

export default TaskPage;
