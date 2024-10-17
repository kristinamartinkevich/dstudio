import { create } from 'zustand';

interface ProjectStore {
    loading: boolean;
    loggedIn: boolean;
    email: string;
    username: string;
    password: string;
    token: string;
    tasks: any[];
    error: string | null;
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
    email: '',
    username: '',
    password: '',
    token: '',
    tasks: [],
    error: null,
    setError: (error) => set({ error: error }),
    setTasks: (tasks) => set({ tasks: tasks }),
    setLoading: (loading) => set({ loading: loading }),
    setLoggedIn: (loggedIn) => set({ loggedIn: loggedIn }),
    setEmail: (email) => set({ email }),
    setUsername: (username) => set({ username }),
    setPassword: (password) => set({ password }),
    setToken: (token) => set({ token }),
}));