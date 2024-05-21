import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL // เปลี่ยน URL เพื่อให้ตรงกับ API endpoint ของคุณ

const getPlant = async () => {
    try {
        const response = await axios.get(`${API_URL}/plantList`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch plant list:', error);
        throw error;
    }
};

const getPlantAll = async () =>{
    try{
        const response = await axios.get(`${API_URL}/plantList/all`);
        return response.data;
    } catch(error){
        console.error('Failed to fetch plant list:', error);
        throw error;
    }
}

export { getPlant, getPlantAll };
