const Client = (sequelize, Sequelize) => {
  return sequelize.define("client", {
    name: {
      type: Sequelize.STRING
    },
    active: {
      type: Sequelize.BOOLEAN
    }
  }, {
    timestamps: true
  })
}

export default Client
