import fs from 'node:fs';
import path from 'path';
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
    if (newPath[1] == ':') {
        if (await isAccessPath(newPath)) {
            return newPath;
        }     
    }

    const joinPath = path.join(currentPath, newPath);
 
    if (await isAccessPath(joinPath)){
        return joinPath;
    } else {
        console.log('Operation failed');
    }
}
