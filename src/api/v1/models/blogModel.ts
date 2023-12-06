import { Association, DataTypes, HasManyGetAssociationsMixin, Model, Sequelize } from 'sequelize'
import { sequlizeConfig } from '../../../helpers/mysql'
import { Author } from './authorModel'

export class Blog extends Model {
  public blogId!: string
  public title!: string
  public body!: string | null
  public authorId!: string

   // Define the association with Author (Blog belongs to Author)
   public getAuthor!: HasManyGetAssociationsMixin<Author>;

   public static associations: {
     author: Association<Blog, Author>;
   };
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
    sequelize: sequlizeConfig(), // Pass the Sequelize instance to the model
    modelName: 'Blog', // Set the model name
    tableName: 'blogs', // Set the table name (optional)
    // Other model configurations can be added here
  },
)

export interface BlogInstance extends Blog {}
