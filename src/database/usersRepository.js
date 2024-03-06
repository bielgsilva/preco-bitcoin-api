const knex = require("./index");

const addUser = async (email) => {
  try {
    const user = await knex("usuarios").insert({ email }).returning("*");

    return user[0];
  } catch (error) {
    throw new Error(error.message);
  }
};


const getAllUsers = async () => {
  try {
    const users = await knex("users");
    if (users.length === 0) {
      throw new Error("User not found");
    }

    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByEmail = async (emailToFound) => {
  try {
    const email = await knex("users").where("email", emailToFound);

    if (email.length === 0) {
      throw new Error("Email or password invalid");
    }

    return email[0];

  } catch (error) {
    throw new Error(error.message);
  }
};


const deleteUser = async (id) => {
  try {
    await getUserById(id);

    await knex("users").where("id", id).del();
  } catch (error) {
    throw new Error(error.message);
  }
};



module.exports = {
  addUser,
  getAllUsers,
  getUserByEmail,
  deleteUser,
};
