import { DataTypes, Sequelize, Model } from 'sequelize'

const authorSchema = (sequelize: Sequelize) => {
  class Author extends Model {
    public authorId!: string
    public name!: string
    public email!: string
    public password!: string

    // You can define associations and class methods here if needed

    // You can also define additional constraints or configurations for the model
  }

  Author.init(
    {
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
    },
    {
      sequelize, // Pass the Sequelize instance to the model
      modelName: 'Author', // Set the model name
      tableName: 'authors', // Set the table name (optional)
      // Other model configurations can be added here
    },
  )

  return Author
}

export default authorSchema
