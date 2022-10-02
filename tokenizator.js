// função criada com base nos conhecimentos
// const tokenizator = () => {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let token = ' ';
//     const charactersLength = characters.length;
//     for (let i = 1; i < 16; i += 1) {
//         token += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     console.log(token);
//     return token;
// };
const crypto = require('crypto');

const tokenizator = () => crypto.randomBytes(8).toString('hex');

module.exports = tokenizator;