import { FormEvent } from "react";
import {
    Button,
    Input,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
} from "@nextui-org/react";

import { useProjectStore } from "@/store";
import { getUTCTimestamp, UTCToDate } from "@/utils/utils";
import { Task } from "@/types";
import { deleteTask, editTask } from "@/utils/apiService";
import { DeleteIcon } from "@/assets/icons";

const EditTask = ({ task }: { task: Task }) => {
    const { setLoading, token } = useProjectStore();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);

        try {
            const updatedTask: Partial<Task> = {
                createdAt: task.createdAt,
                updatedAt: getUTCTimestamp(new Date()),
                isCompleted: task.isCompleted,
                dueDate: getUTCTimestamp(new Date(formData.get("dueDate") as string)),
                title: formData.get("title") as string
            };

            await editTask(task.id, updatedTask, token);
        } catch (error) {
            console.error("Error updating task:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteTaskItem = async (token: string, id: string) => {
        setLoading(true);
        try {
            await deleteTask(token, id);
        } catch (error: any) {
            console.error("Error deleting task:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalContent>
            <form onSubmit={handleSubmit}>
                <ModalHeader>Edit Task <span className="text-primary ml-1">{task.title}</span></ModalHeader>
                <ModalBody className="flex flex-col gap-4">
                    <div>
                        <Input
                            defaultValue={task.title}
                            label="Title"
                            name="title"
                            placeholder="Title"
                            type="text"
                        />
                    </div>
                    <div>
                        <Textarea
                            defaultValue={task.description}
                            label="Description"
                            name="description"
                            placeholder="Description"
                            type="text"
                        />
                    </div>
                    <div>
                        <Input
                            defaultValue={UTCToDate(task.dueDate)}
                            description="Due Date must be in the future"
                            label="Due Date"
                            name="dueDate"
                            placeholder="Due Date"
                            type="date"
                        />
                    </div>
                </ModalBody>
                <ModalFooter className="flex justify-between">
                    <Button
                        isIconOnly
                        className="p-2"
                        color="danger"
                        type="button"
                        variant="flat"
                        onPress={() => deleteTaskItem(token, task.id)}
                    >
                        <DeleteIcon />
                    </Button>
                    <Button color="primary" type="submit">
                        Update Task
                    </Button>
                </ModalFooter>
            </form>
        </ModalContent >
    );
};

export default EditTask;
