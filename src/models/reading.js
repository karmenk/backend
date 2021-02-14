const Reading = (sequelize, Sequelize) => {
  return sequelize.define("reading", {
    time: {
      type: Sequelize.DATE
    },
    reading: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: true
  })
}

export default Reading
