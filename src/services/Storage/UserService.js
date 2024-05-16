const storeUser = (user) => {
    localStorage.setItem('user',user);
}

const getUser = () => {
    return localStorage.getItem('user');
}

export { storeUser, getUser }