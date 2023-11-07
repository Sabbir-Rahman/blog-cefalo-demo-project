import { DataTypes, Sequelize, Model, Association, HasManyAddAssociationMixin, HasManyGetAssociationsMixin } from 'sequelize'
import { sequlizeConfig } from '../../../helpers/mysql'
import { Blog } from './blogModel'

export class Author extends Model {
  public authorId!: string
  public name!: string
  public email!: string
  public password!: string

  public getBlogs!: HasManyGetAssociationsMixin<Blog>
  public addBlog!: HasManyAddAssociationMixin<Blog, 'blogId'>

  public static associations: {
    blogs: Association<Author, Blog>
  }
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
    sequelize: sequlizeConfig(), // Pass the Sequelize instance to the model
    modelName: 'Author', // Set the model name
    tableName: 'authors', // Set the table name (optional)
    // Other model configurations can be added here
  },
)

export interface AuthorInstance extends Author {}
