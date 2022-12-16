import { setCurrentPath, getCurrentPath } from '../utils/current-path.js';
import { isAccessPath } from '../utils/path.js';
import path from 'path';
import { parseOperation } from '../utils/path.js';

export const handlerCd = async (operation) => {
    const arrParamOperation = parseOperation(operation.trim());
    if (arrParamOperation.length != 2) {
        console.log('Invalid input');
        return;
    }
    await getNewPath(getCurrentPath(), arrParamOperation[1]);
}

const getNewPath = async (currentPath, newPath) => {
    if (newPath[1] == ':') {
        if (await isAccessPath(newPath)) {
            setCurrentPath(newPath);
            return newPath;
        }     
    }
    const joinPath = path.join(currentPath, newPath);

    if (await isAccessPath(joinPath)){
        setCurrentPath(joinPath);
        return joinPath;
    } else {
        console.log('Operation failed');
    }
}
