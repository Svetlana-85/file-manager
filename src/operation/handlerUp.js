import { setCurrentPath, getCurrentPath } from '../utils/current-path.js';
import path from 'path';

export const handlerUp = (operation) => {
    if (operation.split(' ').length !== 1) {
        console.log('Invalid input');
        return;
    }
    setCurrentPath(path.dirname(getCurrentPath()));
}
