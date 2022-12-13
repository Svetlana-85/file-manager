import os from 'os';

const homePath = os.homedir();

let currentPath = homePath;

export const getCurrentPath = () => {
    return currentPath;
}

export const setCurrentPath = (newPath) => {
    currentPath = newPath;  
};
