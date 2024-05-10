const getPlantNo = () => {
    return localStorage.getItem('PLANT_NO');
};

const isPlantChecked = () => {
    return !!getPlantNo();
};

export { getPlantNo, isPlantChecked };
