import { useEffect } from "react";
import { Button, Modal, useDisclosure } from "@nextui-org/react";

import { fetchTasks } from "@/utils/apiService";
import { useProjectStore } from "@/store";
import TaskList from "@/module/components/TaskList";
import NoResults from "@/module/common/NoResults";
import CreateTask from "@/module/components/CreateTask";
import { PlusIcon } from "@/assets/icons";

const TaskPage = () => {
    const { tasks, setTasks, token, loading } = useProjectStore();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const fetchData = async () => {
        try {
            const response = await fetchTasks(token);
            setTasks(response.data);
        } catch (error: any) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="flex mb-3 justify-between">
                <span className="text-xl font-semibold">Task Manager</span>
                <Button
                    color="secondary"
                    startContent={<PlusIcon />}
                    onPress={onOpen}
                >
                    Create a task
                </Button>
                <Modal isOpen={isOpen} onClose={fetchData} onOpenChange={onOpenChange}>
                    <CreateTask />
                </Modal>
            </div>
            {!loading && tasks.length > 0 ? (
                <TaskList tasks={tasks} />
            ) : (
                <NoResults onButtonClick={fetchData} />
            )}
        </>
    );
};

export default TaskPage;
