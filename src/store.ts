import { create } from "zustand";
import { Task } from "./types";

interface ProjectStore {
    loading: boolean;
    loggedIn: boolean;
    email: string;
    username: string;
    password: string;
    token: string;
    tasks: Task[];
    error: string | null;
    isSignUp: boolean;
    setIsSignUp: (isSignUp: boolean) => void;
    setError: (error: string) => void;
    setTasks: (tasks: any[]) => void;
    setLoading: (loading: boolean) => void;
    setLoggedIn: (loggedIn: boolean) => void;
    setEmail: (email: string) => void;
    setUsername: (username: string) => void;
    setPassword: (password: string) => void;
    setToken: (token: string) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
    loading: false,
    loggedIn: false,
    email: "",
    username: "",
    password: "",
    token: "",
    tasks: [],
    error: null,
    isSignUp: true,
    setIsSignUp: (isSignUp) => set({ isSignUp: isSignUp }),
    setError: (error) => set({ error: error }),
    setTasks: (tasks) => set({ tasks: tasks }),
    setLoading: (loading) => set({ loading: loading }),
    setLoggedIn: (loggedIn) => set({ loggedIn: loggedIn }),
    setEmail: (email) => set({ email }),
    setUsername: (username) => set({ username }),
    setPassword: (password) => set({ password }),
    setToken: (token) => set({ token }),
}));
