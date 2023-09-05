import { Op } from 'sequelize'

export default class BlogQueryAllowDto {
  static createQueryObject(blog) {
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
