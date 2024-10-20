import {
    Button,
    Input,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
} from "@nextui-org/react";
import { FormEvent } from "react";

import { useProjectStore } from "@/store";
import { Task } from "@/types";
import { createTask, generateUUID } from "@/utils/apiService";
import { getUTCTimestamp } from "@/utils/utils";

const CreateTask = () => {
    const { token, setLoading } = useProjectStore();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        setLoading(true);
        try {
            const todayUTC = getUTCTimestamp(new Date());

            const newTask: Task = {
                id: await generateUUID(),
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                isCompleted: false,
                dueDate: getUTCTimestamp(new Date(formData.get("dueDate") as string)),
                createdAt: todayUTC,
                updatedAt: todayUTC,
            };

            await createTask(token, newTask);
        } catch (error: any) {
            console.error("Error creating task:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalContent>
            <form onSubmit={handleSubmit}>
                <ModalHeader className="flex flex-col gap-1">Create Task</ModalHeader>
                <ModalBody>
                    <div>
                        <Input
                            autoFocus
                            required
                            label="Title"
                            name="title"
                            placeholder="Title"
                            type="text"
                        />
                    </div>
                    <div>
                        <Input
                            required
                            description="Due Date must be in the future"
                            label="Due Date"
                            name="dueDate"
                            placeholder="Due Date"
                            type="date"
                        />
                    </div>
                    <div>
                        <Textarea
                            required
                            label="Description"
                            name="description"
                            placeholder="Description"
                            type="text"
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type="submit">
                        Add Task
                    </Button>
                </ModalFooter>
            </form>
        </ModalContent>
    );
};

export default CreateTask;
