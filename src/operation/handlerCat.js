import fs from 'node:fs';
import { parseOperation, isAccessPath } from '../utils/path.js';
import { getCurrentPath } from '../utils/current-path.js';

export const handlerCat = async (operation) => {
    const arrParamOperation = parseOperation(operation.trim());
    if (arrParamOperation.length != 2) {
        console.log('Invalid input');
        return;
    }
    let pathFile;
    try {
        pathFile = await getPathFile(getCurrentPath(), arrParamOperation[1]);
    } catch {
        console.log('File not found');
        return;
    };
    try {
        const stream = fs.createReadStream(pathFile, 'utf8');
        stream.pipe(process.stdout);
        return new Promise((resolve) => {
            stream.on('end', resolve);
        });
    } catch {
        console.log('Operation failed');
    };
}

const getPathFile = async (currentPath, newPath) => {
    if (newPath[1] === ':') {
        const isAccess = await isAccessPath(newPath);
        if (isAccess) {
            return newPath;
        } else {
            console.log('File not found');
        }
    }
    return path.join(currentPath, newPath);
}