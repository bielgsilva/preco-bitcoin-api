const knex = require('../../database')

const transportador = require('../mailSender/email')
const compilador = require('../../utils/compilador')

const { creatUserService, editUserLogged, emailVerify } = require("../../servicesSQL/usersServices/index");
const login = require("../../servicesSQL/loginServices/index");


const checkEmail = async (request, response) => {
  const { name, email } = request.body;

  try {
    const result = await emailVerify(name, email);

    return response.status(200).json(result);
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Error", error: error.message });
  }
};

const createUser = async (request, response) => {
  const { name, email, password } = request.body;

  const html = await compilador('./src/controllers/usersControllers/templatesEmail/login.html', {
    nomeusuario: name
  });

  await transportador.sendMail({
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
    to: `${name} <${email}>`,
    cc: 'ggsilva.eng@gmail.com',
    subject: "Este e um email de Verificacao de Cadastro",
    html
  }).then(() => {
    console.log('Email enviado');
  }).catch((error) => {
    console.error(error);
  });

  try {
    const user = await creatUserService(name, email, password);

    return response.status(201).json(user);

  } catch (error) {
    return response
      .status(500)
      .json({ message: "Error", error: error.message });
  }
};

const loginUser = async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response
      .status(400)
      .json({ message: "Email and password required" });
  }

  try {
    const token = await login(email, password);

    return response.status(200).json(token);

  } catch (error) {
    return response
      .status(500)
      .json({ message: "Error", error: error.message });
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

const updateUsers = async (request, response) => {
  const { id } = request.params;

  const { name, email, cpf } = request.body;

  try {
    const userData = {
      name,
      email,
      cpf
    };

    const user = await editUserLogged(userData, id);

    return response.status(201).json({ user });

  } catch (error) {
    return response
      .status(500)
      .json({ message: "Error", error: error.message, name: error.name });
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
  createUser,
  getUser,
  loginUser,
  selectAllUser,
  updateUsers,
};
