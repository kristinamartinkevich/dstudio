import {
    Card,
    CardFooter,
    CardHeader,
    Checkbox,
    Button,
    Modal,
    useDisclosure,
    Divider,
    AccordionItem,
    Accordion
} from "@nextui-org/react";

import EditTask from "./EditTask";

import { Task } from "@/types";
import { editTask } from "@/utils/apiService";
import { useProjectStore } from "@/store";
import { UTCToDate } from "@/utils/utils";
import { EditIcon } from "@/assets/icons";

const TaskItem = ({ task }: { task: Task }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { setLoading, token } = useProjectStore();

    const changeCompletion = async (checked: boolean) => {
        setLoading(true);
        try {
            const updatedTask: Task = task
            updatedTask.isCompleted = checked
            await editTask(task.id, updatedTask, token);
        } catch (error: any) {
            console.error("Error updating task completion:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="shadow-md bg-slate-50 dark:bg-slate-900 drop-shadow-md rounded-small" >
            <CardHeader className="flex justify-end items-center p-3">
                <Accordion>
                    <AccordionItem
                        startContent={
                            <>
                                <Checkbox
                                    color="success"
                                    isSelected={task.isCompleted}
                                    onChange={(event) => changeCompletion(event.target.checked)}
                                />
                                <span
                                    className={`text-lg font-semibold ${task.isCompleted ? "line-through text-gray-400 dark:text-zinc-600" : "text-gray-800 dark:text-white"}`}
                                >
                                    {task.title}
                                </span>
                            </>
                        }
                    >
                        <p className="text-sm text-slate-500">{task.description}</p>
                    </AccordionItem>
                </Accordion>
                <Button
                    isIconOnly
                    className="p-2 rounded-full"
                    color="warning"
                    type="button"
                    onPress={onOpen}
                >
                    <EditIcon />
                </Button>
            </CardHeader>

            <Divider />

            <CardFooter className="flex justify-between items-center p-3">
                <div className="text-sm">
                    <span className="text-slate-500 mr-1">Due:</span>
                    <span className="text-slate-400">{UTCToDate(task.dueDate)}</span>
                </div>

                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <EditTask task={task} />
                </Modal>
            </CardFooter>
        </Card>
    );
};

export default TaskItem;
