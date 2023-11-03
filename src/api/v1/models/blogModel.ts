import { DataTypes, Sequelize } from 'sequelize'

const blogSchema = (sequelize: Sequelize) => {
  const Blog = sequelize.define('blog', {
    blogId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
    },
    authorId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  return Blog
}

export default blogSchema
