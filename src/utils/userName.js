import pc from 'node:process';

export const parseName = () => {
    try {
        const userName = pc.argv.find((val) => val.startsWith('--username')).split('=')[1];
        return userName;
    } catch {
        return 'Unknown';
    }
};

parseName();