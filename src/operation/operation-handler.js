import process from 'node:process';
import { handlerCd } from './handlerCd.js';
import { handlerUp } from './handlerUp.js';
import { handlerLs } from './handlerLs.js';
import { handlerCat } from './handlerCat.js';
import { handlerAdd } from './handlerAdd.js';
import { handlerRn } from './handlerRn.js';
import { handlerRm } from './handlerRm.js';
import { handlerHash } from './handlerHash.js';
import { handlerCp } from './handlerCp.js';
import { handlerMv } from './handlerMv.js';
import { handlerOs } from './handlerOs.js';
import { handlerCompress } from './handlerCompress.js';
import { handlerDecompress } from './handlerDecompress.js';

export const operationHandler = async(operation) => {
    switch (operation.split(' ')[0]) {
        case 'cd':
            await handlerCd(operation);
            break;
        case 'up':
            handlerUp(operation);
            break;
        case 'ls':
            handlerLs(operation);
            break;
        case 'cat':
            await handlerCat(operation);
            break;
        case 'add':
            await handlerAdd(operation);
            break;
        case 'rn':
            await handlerRn(operation);
            break;
        case 'cp':
            await handlerCp(operation);
            break;
        case 'mv':
            await handlerMv(operation);
            break;
        case 'rm':
            await handlerRm(operation);
            break;
        case 'os':
            await handlerOs(operation);
            break;
        case 'hash':
            await handlerHash(operation);
            break;
        case 'compress':
            await handlerCompress(operation);
            break;
        case 'decompress':
            await handlerDecompress(operation);
            break;
        default: process.stdout.write('Invalid input\n');;
    }
}