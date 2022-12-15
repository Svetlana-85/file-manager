import process from 'node:process';
import { handlerCd } from './handlerCd.js';
import { handlerUp } from './handlerUp.js';
import { handlerLs } from './handlerLs.js';
import { handlerCat } from './handlerLs.js';

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
            handlerCat(operation);
            break;
        case 'add':
            process.stdout.write('operation add\n');
            break;
        case 'rn':
            process.stdout.write('operation rn\n');
            break;
        case 'cp':
            process.stdout.write('operation cp\n');
            break;
        case 'mv':
            process.stdout.write('operation mv\n');
            break;
        case 'rm':
            process.stdout.write('operation rm\n');
            break;
        case 'os':
            process.stdout.write('operation os\n');
            break;
        case 'hash':
            process.stdout.write('operation hash\n');
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