import readline from 'readline';
import crypto from 'crypto';
import { validate } from 'uuid';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

/**
 * @param {string} name 
 */
const createNamespace = (name) => {
    const hash = crypto.createHash('sha1').update(name).digest('hex');
    let namespace = hash.slice(0, 8).concat('-', hash.slice(8, 12), '-', '5', hash.slice(13, 16), '-', '$', hash.slice(17, 20), '-', hash.slice(20, 32));

    let partialByte = [];
    partialByte[0] = parseInt((parseInt(hash[16], '16') % 4) / 2);
    partialByte[1] = parseInt(hash[16], '16') % 2;

    let digit = (8 + partialByte[0] * 2 + partialByte[1]).toString(16);
    namespace = namespace.replace(/\$/g, digit);

    if (validate) {
        console.log(namespace);
    }
};

rl.on('line', (l) => {
    createNamespace(l);
    rl.close();
});

rl.on('close', () => {
    process.exit();
});