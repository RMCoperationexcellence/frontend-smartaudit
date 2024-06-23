import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL


const getuserEXAM = async (plant_no) => {
    try {
        const response = await axios.get(`${API_URL}/userEXAM?plant_no=${plant_no}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch plant list:', error);
        throw error;
    }
};

const getSafety = async (plant_no) => {
    try {
        const response = await axios.get(`${API_URL}/plantSafety?plant_no=${plant_no}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch plant list:', error);
        throw error;
    }
}

const getENV = async (plant_no) => {
    try {
        const response = await axios.get(`${API_URL}/plantENV?plant_no=${plant_no}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch plant list:', error);
        throw error;
    }
}

export { getuserEXAM, getENV, getSafety };