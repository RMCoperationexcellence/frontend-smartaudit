import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL


const getAuditResult = async (plant_no) => {
    try {
        const response = await axios.get(`${API_URL}/results/audit?plant_no=${plant_no}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch plant list:', error);
        throw error;
    }
};

const getAuditResultDetail = async (AUDIT_RESULT_ID) => {
    try {
        const response = await axios.get(`${API_URL}/results/ResultDetail?AUDIT_RESULT_ID=${AUDIT_RESULT_ID}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch:', error);
        throw error;
    }
};

const getTest = async () => {
    try {
        const response = await axios.get(`http://192.168.10.111:3001/plantList/PlantData?DivNo=90000143&DeptNo=14547&SectNo=14669`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch plant list:', error);
        throw error;
    }
};

export { getAuditResult, getTest, getAuditResultDetail };