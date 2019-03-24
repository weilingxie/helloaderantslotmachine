
const setLocalStorage = (status) => {
    localStorage.setItem("status", status);
}

const getLocalStorage = () => localStorage.getItem("status");

export default { setLocalStorage, getLocalStorage };