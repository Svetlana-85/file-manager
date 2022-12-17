import process from 'node:process';
import { handlerCd } from './handlerCd.js';
import { handlerUp } from './handlerUp.js';
import { handlerLs } from './handlerLs.js';
import { handlerCat } from './handlerCat.js';
import { handlerAdd } from './handlerAdd.js';
import { handlerRn } from './handlerRn.js';
import { handlerRm } from './handlerRm.js';
import { handlerHash } from './handlerHash.js';

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
            process.stdout.write('operation cp\n');
            break;
        case 'mv':
            process.stdout.write('operation mv\n');
            break;
        case 'rm':
            await handlerRm(operation);
            break;
        case 'os':
            process.stdout.write('operation os\n');
            break;
        case 'hash':
            await handlerHash(operation);
            break;
        case 'compress':
            process.stdout.write('operation compress\n');
            break;
        case 'decompress':
            process.stdout.write('operation decompress\n');
            break;
        default: process.stdout.write('Invalid input\n');;
    }
}