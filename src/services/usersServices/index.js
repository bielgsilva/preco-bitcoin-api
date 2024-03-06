const bcrypt = require("bcrypt");
const knex = require("../../database/index")
const { addUser } = require('../../database/usersRepository')

const creatUser = async ( email ) => {
  try {
    const emailExist = await knex("usuarios").where("email", email);

    if (emailExist.length > 0) {
      throw new Error("Email already registered");
    }

    const userCreated = await addUser(email);

    return { userCreated };
    
  } catch (error) {
    throw new Error(error.message);
  }
};

const emailVerify = async (email) => {
  if (!email) {
    throw new Error("Email required");
  }
  const userExist = await knex("usuarios").where("email", email);

  if (userExist.length > 0) {
    return { canRegister: false, error: "User already registered" };
  }
  return { canRegister: true };
};



module.exports = { creatUser, emailVerify };
