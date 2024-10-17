import { Task } from '@/types';
import axios from 'axios';

const API_URL = "http://api.calmplete.net/api";

export const Signup = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/InternalLogin/sign-up`, {
        email,
        password
    });
    return response
};


export const Login = async (username: string, password: string): Promise<string> => {
    const response = await axios.post(`${API_URL}/InternalLogin`, {
        username,
        password,
        state: "Internal"
    });
    return response.data.accessToken
};


export const fetchTaskById = async (id: string, token: string) => {
    const response = await axios.get(`${API_URL}/Todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response
};

export const editTask = async (id: string, task: Partial<Task>, token: string) => {
    const response = await axios.put(`${API_URL}/Todos/${id}`, task, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return response
};

export const createTask = async (token: string, task: Task) => {
    return await axios.post(`${API_URL}/Todos`, task, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const fetchTasks = async (token: string) => {
    const response = await axios.get(`${API_URL}/Todos`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response
};


export const generateUUID = async () => {
    const response = await axios.get('https://www.uuidgenerator.net/api/version1')
    return response.data
};


export const deleteTask = async (token: string, id: string) => {
    console.log(id)
    await axios.delete(`${API_URL}/Todos/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};

