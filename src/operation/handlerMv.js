import path from 'node:path';
import fs from 'node:fs';
import { stat, writeFile, unlink } from 'node:fs/promises';
import { getCurrentPath } from '../utils/current-path.js';
import { parseOperation3Args, isAccessPath } from '../utils/path.js';
import { pipeline } from 'stream';

export const handlerMv = async(operation) => {
    try {
        const arrParamOperation = parseOperation3Args(operation.trim());
        if (arrParamOperation.length != 3) {
            console.log('Invalid input');
            return;
        }
        let pathFile = arrParamOperation[1].trim();
        const nameFile = getNameFile(pathFile);
        if (pathFile[1].indexOf(':') === -1) {
            pathFile = path.join(getCurrentPath(), pathFile);
        }
        let pathNewFile = arrParamOperation[2].trim();
        if (pathNewFile.length === 1 || pathNewFile[1].indexOf(':') === -1) {
            pathNewFile = path.join(getCurrentPath(), pathNewFile, nameFile);
        } else {
            pathNewFile = path.join(pathNewFile, nameFile);
        }
        if (await isAccessPath(pathFile)) {
            await stat(pathNewFile).then(() => {
                console.log('Operation failed: file exists');
            }).catch(async () => {
                await writeFile(pathNewFile, '', (err) => {
                    if (err) {
                        console.log('1 Operation failed');
                        return;
                    }
                });
                const readStream = fs.createReadStream(pathFile, 'utf8');
                const writeStream = fs.createWriteStream(pathNewFile, 'utf8');
                pipeline(readStream, writeStream, async(err) => {
                    if (err) {
                        console.log('Operation failed');
                        return;
                    }
                    await unlink(pathFile).catch(() => {
                        console.log('Operation failed');
                    });
                });
            });
        } else {
            console.log('Operation failed');
        }
    } catch {
        console.log('Operation failed');
    }
}

const getNameFile = (pathFile) => {
    const pos = pathFile.lastIndexOf('\\') ===-1 ? pathFile.lastIndexOf('/') : pathFile.lastIndexOf('\\');
    if (pos !== -1) return pathFile.slice(pos+1);
    else return pathFile;
}
