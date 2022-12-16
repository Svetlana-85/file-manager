import { access } from 'node:fs/promises';

export const parseOperation = (operation) => {
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

export const isAccessPath = async (path) => {
    try {
        await access(path);
        return true;
    } catch {
        return false;
    }
}
