import path from 'path';
import { stat, writeFile } from 'node:fs/promises';
import { getCurrentPath } from '../utils/current-path.js';
import { parseOperation } from '../utils/path.js';

export const handlerAdd = async(operation) => {
    const arrParamOperation = parseOperation(operation.trim());
    if (arrParamOperation.length != 2) {
        console.log('Invalid input');
        return;
    }
    const pathFile = path.join(getCurrentPath(), arrParamOperation[1]);
    console.log(pathFile);
    try {
        await stat(pathFile).then(() => {
            console.log('file exists');
        }).catch(async () => {
            await writeFile(pathFile, '', (err) => {
                if (err) console.log('Operation failed');
            });
        });
    } catch {
        console.log('Operation failed');
    }
}
