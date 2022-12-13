import process from 'node:process';
import { access } from 'node:fs/promises';
import { setCurrentPath, getCurrentPath } from '../utils/current-path.js';
import path from 'path';

export const handlerCd = async (operation) => {
    const arrParamOperation = parseOperation(operation.trim());
    if (arrParamOperation.length != 2) {
        console.log('Invalid input');
        return;
    }
    await getNewPath(getCurrentPath(), arrParamOperation[1]);
}

const getNewPath = async (currentPath, newPath) => {
    if (newPath[1] == ':') {
        if (await isAccessPath(newPath)) {
            setCurrentPath(newPath);
            return newPath;
        }     
    }
    const joinPath = path.join(currentPath, newPath);

    if (await isAccessPath(joinPath)){
        setCurrentPath(joinPath);
        return joinPath;
    } else {
        console.log('Operation failed');
    }
}

const isAccessPath = async (path) => {
    try {
        await access(path);
        return true;
    } catch {
        return false;
    }
}

const parseOperation = (operation) => {
    let arrArgs = [];
    if (operation.indexOf('"') != -1) {
        arrArgs = operation.split('"');
        arrArgs.pop();
    } else if (operation.indexOf("'") != -1) {
        arrArgs = operation.split("'");
        arrArgs.pop();
    } else {
        arrArgs = operation.split(" ");
    }

    return arrArgs;
}
