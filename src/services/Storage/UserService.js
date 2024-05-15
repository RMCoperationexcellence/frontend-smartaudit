const storeUser = (user) => {
    localStorage.setItem('user',user);
}

export { storeUser }