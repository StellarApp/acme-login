const conn = require("./conn");
const { Sequelize } = conn;
const { STRING, UUID, UUIDV4 } = Sequelize;

const User = conn.define("user", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      len:[6, 100]
    }
  }
});

module.exports = User;
