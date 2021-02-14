const Account = (sequelize, Sequelize) => {
  return sequelize.define("account", {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: true
  })
}

export default Account
