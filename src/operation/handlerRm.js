import path from 'path';
import { unlink } from 'node:fs/promises';
import { getCurrentPath } from '../utils/current-path.js';
import { parseOperation } from '../utils/path.js';

export const handlerRm = async(operation) => {
    const arrParamOperation = parseOperation(operation.trim());
    if (arrParamOperation.length != 2) {
        console.log('Invalid input');
        return;
    }
    const pathFile = path.join(getCurrentPath(), arrParamOperation[1]);

    try {
        await unlink(pathFile).then(() => {
            console.log('file delete');
        }).catch(() => {
            console.log('Operation failed');
        });
    } catch {
        console.log('Operation failed');
    }
}
