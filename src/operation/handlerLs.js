import { getCurrentPath } from '../utils/current-path.js';
import { readdir } from 'node:fs/promises';

export const handlerLs = async (operation) => {
    if (operation.split(' ').length !== 1) {
        console.log('Invalid input');
        return;
    }
    await createTableList();
}

const createTableList = async() => {
    try {
        const files = await readdir(getCurrentPath(), {withFileTypes: true, encoding: 'utf8'});
        let arrObj = [];
        files.forEach((item) => {
            const type = item.isFile()?'file':item.isDirectory?'directory':'undefined';
            arrObj.push ({'name': item.name, 'type': type});
        });
        console.table(arrObj);
        
    } catch (err) {
      console.error(err);
    }
}