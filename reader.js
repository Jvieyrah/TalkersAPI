const fs = require('fs').promises;
// const talker = require('./talker.json');

async function read() {
  try {
    const talkers = await fs.readFile('./talker.json', 'utf8');
    console.log(talkers);
    return JSON.parse(talkers);
    // return talkers;
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.message}`);
  }
}

async function write(newEntry) {
    await fs.writeFile('./talker.json', JSON.stringify(newEntry));
 }

// async function write(newEntry) {   
//     // console.log(newEntry); 
//     try {
//     //  const talkers = await read() ;
//     //  console.log(talkers); 
//     // talkers.push(newEntry);
//     //  console.log(talkers); 
//     await fs.writeFile('./talker.json', JSON.stringify(newEntry));
//     //   return JSON.parse(talkers);
//     //  return talkers;
//     } catch (err) {
//       console.error(`Erro ao escrever o arquivo: ${err.message}`);
//     }
//   }

module.exports = { read, write };