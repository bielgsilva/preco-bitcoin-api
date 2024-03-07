const knex = require('../../database')
const cron = require('cron');


const transportador = require('../mailSender/email')
const compilador = require('../../utils/compilador')

const { creatUser, emailVerify } = require("../../services/usersServices/index");

const job = new cron.CronJob('36 22 * * *', () => {

  transportador.sendMail({
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
    to: `ggsilva.eng@gmail.com`,
    cc: 'ggsilva.eng@gmail.com',
    subject: "Este e um email de Verificacao de Cadastro",
    text: "Isso é um teste"


  }).then(() => {
    console.log('Email enviado');
  }).catch((error) => {
    console.error(error);
  });

}, null, true, 'America/Sao_Paulo');

job.start();


const newUser = async (request, response) => {
  const { email } = request.query;

  const html = await compilador('./src/controllers/mailSender/templatesEmail/login.html');

  await transportador.sendMail({
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
    to: `<${email}>`,
    cc: 'ggsilva.eng@gmail.com',
    subject: "Este e um email de Verificacao de Cadastro",
    html

  }).then(() => {
    console.log('Email enviado');
  }).catch((error) => {
    console.error(error);
  });

  try {
    const user = await creatUser(email);

    return response.status(201).json(user);

  } catch (error) {
    return response
      .status(500)
      .json({ message: "Error", error: error.message });
  }
};




const checkEmail = async (request, response) => {
  const { email } = request.body;

  try {
    const result = await emailVerify(email);

    return response.status(200).json(result);

  } catch (error) {
    return response
      .status(500)
      .json({ message: "Não foi possível verificar email", error: error.message });
  }
};


const selectAllUser = async (request, response) => {
  try {
    const usuarios = await knex.select('*').from('users');

    console.log('Dados das usuarios:', usuarios);

    response.json(usuarios);
  } catch (error) {
    console.error('Erro ao fazer a requisição ao banco de dados:', error);
    response.status(500).json({ erro: 'Erro ao buscar os dados das empresas' });
  }
};


const getUser = async (request, response) => {
  const { email } = request.query;

  try {
    const user = await knex('users').where("email", email).first().debug()

    response.json(user);


  } catch (error) {

    throw new Error(error.message);
  }
};

module.exports = {
  checkEmail,
  newUser,
  getUser,
  selectAllUser
};
