const express = require('express');
// const fs = require('fs');
const bodyParser = require('body-parser');
const { read, write } = require('./reader');
const tokenizator = require('./tokenizator');
const { emailValidator,
   passwordValidator,
   tokenValidator,
   nameValidator,
   ageValidator,
   talkValidator,
   watchedAtValidator,
   rateValidator } = require('./validators');
// const userRouter = require('./router');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar - teste-teste
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', tokenValidator, async (req, res) => {
  const { q } = req.query;
  console.log(q);
  const talkersList = await read();
  if (!q) {
    return res.status(204).json(talkersList);
  }
  const talkerReturn = talkersList.filter((talker) => talker.name.includes(q));
  if (!talkerReturn) {
    return res.status(204).json([]);
  }
  return res.status(200).json(talkerReturn);
});

app.get('/talker', async (_req, res) => {
  const talkersList = await read();
  return res.status(200).json(talkersList);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkersList = await read();
  const talkerId = talkersList.find((talker) => talker.id === Number(id));
  if (!talkerId || talkerId === undefined) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talkerId);
});

// app.use(emailValidator, passwordValidator);

app.post('/login', emailValidator, passwordValidator, (req, res) => {
  const { email, password } = req.body;
  const response = tokenizator();
  if (email && password) {
    return res.status(200).json({ token: response });
  }
});

app.use(tokenValidator);

app.delete('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkersList = await read();
  const talkerId = talkersList.map((talker) => talker.id !== Number(id));
   write(talkerId);
  return res.status(204).json();
});

app.use(nameValidator, ageValidator, talkValidator,
  watchedAtValidator, rateValidator);

app.post('/talker', async (req, res) => {
  // const { name, age, talk } = req.body;
  const talkersList = await read();
  const newId = talkersList.length + 1;
  req.body.id = newId;
  talkersList.push(req.body); 
    write(talkersList);
  return res.status(201).json(req.body);
});

app.put('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkersList = await read();
  const talkerId = talkersList.find((talker) => talker.id === Number(id));
  if (!talkerId || talkerId === undefined) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
   talkerId.name = req.body.name; 
   talkerId.age = req.body.age; 
   talkerId.talk = req.body.talk; 
  //  talkersList.push(talkerId) ;
   write(talkersList);
  return res.status(200).json(talkerId);
});

app.listen(PORT, () => {
  console.log('Online');
});
