const User = (sequelize) => {
  return sequelize.define("user", {}, {
    timestamps: true
  })
}

export default User
