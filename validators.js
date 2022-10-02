const emailValidator = (req, res, next) => { 
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    } if (!email.includes('@') || !email.includes('.com')) {
        return res.status(400)
        .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();    
 };

const passwordValidator = (req, res, next) => { 
    const { password } = req.body;
    const six = 6;
     if (!password) {
      return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    } if (password.length < six) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
      }
    next();    
 };

const tokenValidator = (req, res, next) => { 
    const { authorization } = req.headers;
    const sixteen = 16;
     if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado' });
    } if (authorization.length !== sixteen) {
        return res.status(401).json({ message: 'Token inválido' });
      }
    next();    
 };

const nameValidator = (req, res, next) => { 
    const { name } = req.body;
    const three = 3;
     if (!name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    } if (name.length < three) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
      }
    next();    
 };

 const ageValidator = (req, res, next) => { 
    const { age } = req.body;
    const eighteen = 18;
     if (!age) {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    } if (age < eighteen) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
      }
    next();    
 };

 const watchedAtValidator = (req, res, next) => {
    const { watchedAt } = req.body.talk;
    const dateRegex = new
    RegExp(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/);
    
    if (!watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    } if (!dateRegex.test(watchedAt)) {
        return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();    
  };

  const rateValidator = (req, res, next) => {  
  const { rate } = req.body.talk;
if (rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
} if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
   }
   next();    
  };

 const talkValidator = (req, res, next) => { 
    const { talk } = req.body;
    if (!talk) {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    next();            
 };

   module.exports = { emailValidator,
     passwordValidator,
     tokenValidator,
     nameValidator,
     ageValidator,
     talkValidator,
     watchedAtValidator,
     rateValidator };