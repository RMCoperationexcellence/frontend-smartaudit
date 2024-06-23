// GetAuditForm.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL // เปลี่ยน URL เพื่อให้ตรงกับ API endpoint ของคุณ

const getAuditGroup = async () => {
    try{
        const response = await axios.get(`${API_URL}/auditform/auditgroup`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch auditgroup:', error);
        throw error;
    }
}

const getAuditQuestion = async (audit_group_no ) =>{
    try{
        const response = await axios.get(`${API_URL}/auditForm/Question?audit_group=${audit_group_no}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch plant list:', error);
        throw error;
    }
}

const getAuditQuestionResult = async (audit_group_no, plant_no ) =>{
    try{
        const response = await axios.get(`${API_URL}/auditForm/auditQuestionResult?audit_group_id=${audit_group_no}&plant_no=${plant_no}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch plant list:', error);
        throw error;
    }
}

const getAuditFormResult = async (plant_no ) =>{
    try{
        const response = await axios.get(`${API_URL}/auditForm/auditQuestionResult?plant_no=${plant_no}`);
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

export {getAuditGroup, getAuditForm, getAuditQuestion, getAuditQuestionResult, getAuditFormResult };
