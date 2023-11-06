import { DataTypes, Model, Sequelize } from 'sequelize'

const blogSchema = (sequelize: Sequelize) => {
  class Blog extends Model {
    public blogId!: string
    public title!: string
    public body!: string | null
    public authorId!: string

    // You can define associations and class methods here if needed

    // You can also define additional constraints or configurations for the model
  }

  Blog.init(
    {
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
    },
    {
      sequelize, // Pass the Sequelize instance to the model
      modelName: 'Blog', // Set the model name
      tableName: 'blogs', // Set the table name (optional)
      // Other model configurations can be added here
    },
  )
  
  return Blog
}

export interface BlogInstance extends ReturnType<typeof blogSchema> {}

export default blogSchema
