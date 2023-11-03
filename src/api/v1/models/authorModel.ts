import { DataTypes, Sequelize } from 'sequelize'

const authorSchema = (sequelize: Sequelize) => {
  const Author = sequelize.define('author', {
    authorId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  return Author
}

export default authorSchema
