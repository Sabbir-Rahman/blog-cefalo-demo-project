import { Op } from 'sequelize'
import { BlogQueryInterface } from '../../interfaces/modelInterfaces/blog.interface'

export default class BlogQueryAllowDto {
  static createQueryObject(blog: BlogQueryInterface) {
    return {
      authorId: blog.authorId
        ? blog.authorId
        : {
          [Op.not]: null,
        },
      title: blog.title
        ? blog.title
        : {
          [Op.not]: null,
        },
    }
  }
}
