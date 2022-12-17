import { parseName } from './utils/userName.js';
import readline from 'readline';
import { stdin as input, stdout as output } from 'node:process';
import { exit } from './utils/exit.js';
import { operationHandler } from './operation/operation-handler.js';
import { getCurrentPath } from './utils/current-path.js';

const runManager = () => {
    const rl = readline.createInterface({ input, output });
    const userName = parseName() || 'Unknown';
    output.write(`Welcome to the File Manager, ${userName}!\n`);

    output.write(`You are currently in ${getCurrentPath()}\n`);
    output.write(`Enter command\n`);

    rl.on('line', async (input) => {
        if (input === '.exit') {
            exit(userName);
        } else {
            await operationHandler(input);
            output.write(`You are currently in ${getCurrentPath()}\n`);
            output.write(`Enter command\n`);
        }
    });
    rl.on('SIGINT', () => {
        exit(userName);
    });
    
}

runManager();
