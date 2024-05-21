const getPlantNo = () => {
    return localStorage.getItem('PLANT_NO');
};

const getPlantName = () => {
    return localStorage.getItem('PLANT_NAME');
}

const isPlantChecked = () => {
    return !!getPlantNo();
};

export { getPlantNo, isPlantChecked, getPlantName };
