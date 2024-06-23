const storeUser = (user) => {
    localStorage.setItem('user',user);
}

const getUser = () => {
    return localStorage.getItem('user');
}

const getEmpId = () => {
    const userStr = localStorage.getItem('profile'); // ดึงข้อมูลออกมาเป็น string    
    // ตรวจสอบว่า userStr มีค่าและทำการแปลงเป็น object ด้วย JSON.parse
    const user = userStr ? JSON.parse(userStr) : null;

    console.log(user.user.EMP)

    return user ? user.user.EMP : null; // Accessing the EMP id property
}

export { storeUser, getUser, getEmpId}