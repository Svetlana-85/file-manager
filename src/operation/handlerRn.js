import path from 'node:path';
import { rename, stat } from 'node:fs/promises';
import { getCurrentPath } from '../utils/current-path.js';
import { parseOperation3Args, isAccessPath } from '../utils/path.js';

export const handlerRn = async(operation) => {
    const arrParamOperation = parseOperation3Args(operation.trim());
    if (arrParamOperation.length != 3) {
        console.log('Invalid input');
        return;
    }
    let pathFile = arrParamOperation[1].trim();
    if (pathFile[1].indexOf(':') === -1) {
        pathFile = path.join(getCurrentPath(), pathFile);
    }
    try {
        if (isAccessPath(pathFile)) {
            const pathNewFile = getPathNewFile(pathFile, arrParamOperation[2]);
            await stat(pathNewFile).then(() => {
                console.log('Operation failed');
            }).catch(async () => {
                await rename(pathFile, pathNewFile).catch(() => {
                    console.log('Operation failed');
                });
            });
        } else {
            console.log('Operation failed');
        }
    } catch {
        console.log('Operation failed');
    }
}

const getPathNewFile = (pathFile, fileName) => {
    const pos = pathFile.lastIndexOf('\\') ===-1 ? pathFile.lastIndexOf('/') : pathFile.lastIndexOf('\\');
    if (pos !== -1) return path.join(pathFile.slice(0, pos), fileName);
    else return fileName;
}
