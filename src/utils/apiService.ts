import axios from 'axios';

const API_URL = "http://api.calmplete.net/api";

export const fetchTodos = async () => {
    const response = await axios.get(`${API_URL}/Todos`);
    return response
};

export const fetchTodoById = async (id, token) => {
    const response = await axios.get(`${API_URL}/Todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response
};


export const editTodo = async (id, task) => {
    const response = await axios.get(`${API_URL}/Todos/${id}`, task);
    return response
};

export const createTodo = async (token, task) => {
    const response = await axios.post(`${API_URL}/Todos`, task, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response
};

export const fetchTasks = async (token) => {
    const response = await axios.get(`${API_URL}/Todos`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response
};
