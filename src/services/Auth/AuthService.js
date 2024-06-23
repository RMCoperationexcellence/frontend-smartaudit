import axios from 'axios';
import { storeUser } from '../Storage/UserService'

const API_URL = import.meta.env.VITE_API_URL // เปลี่ยน URL เพื่อให้ตรงกับ API endpoint ของคุณ

const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        if (response.data.success) {
            localStorage.setItem('userToken', response.data.token);  // Save the token
            localStorage.setItem('profile', JSON.stringify(response.data));
            storeUser(username);
            return response.data;
        }
    } catch (error) {
        console.error('Login failed:', error.response.data);
        throw error.response.data;
    }
};

const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
};

const isAuthenticated = () => {
    return !!localStorage.getItem('userToken');
};

const getUserId = async (username) => {
    try {
        const response = await axios.get(`${API_URL}/getUserId`, {
            params: { username } // ส่ง username เป็นพารามิเตอร์ในรูปแบบของ query parameter
        });
        return response.data.userId;
    } catch (error) {
        console.error('Failed to get user ID:', error.response.data);
        throw error.response.data;
    }
};


export { login, logout, isAuthenticated, getUserId };
