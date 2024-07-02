// UserService.js
import { decrypt } from "../../util/decrypt";

const secretKey = 'SmartAudit2024'; // Define your secret key

const storeUser = (user) => {
    localStorage.setItem('user', user);
}

const getUser = () => {
    return localStorage.getItem('user');
}

const getProfile = () => {
    const data = localStorage.getItem('profile');
    return data ? JSON.parse(data) : null;
}   

const getEmpId = () => {
    const userStr = localStorage.getItem('profile'); // ดึงข้อมูลออกมาเป็น string    
    // ตรวจสอบว่า userStr มีค่าและทำการแปลงเป็น object ด้วย JSON.parse
    const user = userStr ? JSON.parse(userStr) : null;

    return user ? user.user.EMP : null; // Accessing the EMP id property
}

const getPermission = () => {
    const userStr = localStorage.getItem('profile'); // ดึงข้อมูลออกมาเป็น string    
    // ตรวจสอบว่า userStr มีค่าและทำการแปลงเป็น object ด้วย JSON.parse
    const user = userStr ? JSON.parse(userStr) : null;

    if (user && user.user && user.user.level) {
        try {
            const decryptedLevel = decrypt(user.user.level, secretKey);
            
            return decryptedLevel;
        } catch (error) {
            console.error("Error decrypting LEVEL:", error);
            return null;
        }
    }
    return null;
}

const getPlantVisible = () => {
    const userStr = localStorage.getItem('profile'); // ดึงข้อมูลออกมาเป็น string
    const user = userStr ? JSON.parse(userStr) : null;
    console.log("encryptedPlant : ",user.user.plant_visible)
    if (user && user.user && user.user.plant_visible) {
        try {
            const decryptedPlantvisible = decrypt(user.user.plant_visible, secretKey);
            return decryptedPlant;
        } catch (error) {
            console.error("Error decrypting PlantVisible:", error);
            return null;
        }
    }
    return null;
    
}
export { storeUser, getUser, getEmpId, getPermission, getPlantVisible, getProfile }
