// GetAuditForm.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL // เปลี่ยน URL เพื่อให้ตรงกับ API endpoint ของคุณ

const getAuditGroup = async () => {
    try{
        const response = await axios.get(`${API_URL}/auditform/auditgroup`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch plant list:', error);
        throw error;
    }
}
const getAuditForm = async ( plant_no ) => {
    try {
        const response = await axios.get(`${API_URL}/auditform/auditgroupresult?plant_no=${plant_no}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch plant list:', error);
        throw error;
    }
};

export {getAuditGroup, getAuditForm };
