import { useEffect } from 'react';
import { fetchTasks } from '@/utils/apiService';
import { useProjectStore } from '@/store';
import TaskList from '@/module/components/TaskList';
import { Button, Modal, useDisclosure } from '@nextui-org/react';
import NoResults from '@/module/common/NoResults';
import CreateTask from '@/module/components/CreateTask';

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
                    <CreateTask />
                </Modal>
            </div>
            {tasks.length > 0 ? (
                <TaskList tasks={tasks} />
            ) : (
                <NoResults onButtonClick={fetchData} />
            )}
        </>
    );
};

export default TaskPage;
