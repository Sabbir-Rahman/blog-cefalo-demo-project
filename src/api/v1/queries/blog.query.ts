/* eslint-disable import/extensions */
import { Op } from 'sequelize'
import BlogQueryAllowDto from '../dto/blogs/blogQueryAllow.dto'
import db from '../models'
import { paginationUtils } from '../utils'
import {
  BlogGeneralViewInterface,
  BlogInterface,
  BlogQueryDataInterface,
  BlogUpdateInterface,
  BlogsWithAuthor,
} from '../interfaces/modelInterfaces/blog.interface'
import { InternalServerError } from '../errors'

const createBlog = async (queryData: BlogInterface): Promise<BlogInterface> => {
  const BlogModel = db.db.blogs
  const newBlog = await BlogModel.create({ queryData })
  if (!newBlog) {
    throw new InternalServerError(
      'Something wrong blog not created',
      'Something wrong blog not created',
    )
  }

  return newBlog
}

const getSingleBlogById = async (blogId: string) => {
  const AuthorModel = db.db.authors
  const BlogModel = db.db.blogs
  const blog: BlogGeneralViewInterface = await BlogModel.findOne({
    where: { blogId },
    attributes: ['blogId', 'title', 'body', 'authorId', 'createdAt', 'updatedAt'],
    include: [
      {
        model: AuthorModel,
        attributes: ['name', 'email'],
      },
    ],
  }) as unknown as BlogGeneralViewInterface

  return blog
}

const viewBlogs = async (queryData: BlogQueryDataInterface) => {
  const BlogModel = db.db.blogs
  const AuthorModel = db.db.authors

  const { page, limit, offset, sortBy, sortOrder, searchText } =
    paginationUtils.getPaginationSearchAndSortInfo(queryData)

  const whereCondition: any = {}
  if (searchText !== 'undefined' && searchText !== '') {
    whereCondition[Op.or] = [
      {
        title: {
          [Op.like]: `%${searchText}%`,
        },
      },
      {
        body: {
          [Op.like]: `%${searchText}%`,
        },
      },
    ]
  }

  const blogs: BlogGeneralViewInterface[] = await BlogModel.findAll({
    limit,
    offset,
    where: whereCondition,
    attributes: ['blogId', 'title', 'body', 'authorId', 'createdAt', 'updatedAt'],
    include: [
      {
        model: AuthorModel,
        attributes: ['name', 'email'],
      },
    ],
    order: [[sortBy, sortOrder]],
  }) as unknown as Array<BlogGeneralViewInterface>

  return blogs
}

const viewBlogsByAuthor = async (queryData: BlogQueryDataInterface) => {
  const BlogModel = db.db.blogs
  const AuthorModel = db.db.authors

  const { page, limit, offset } = paginationUtils.getPaginationSearchAndSortInfo(queryData)
  const queryObj = BlogQueryAllowDto.createQueryObject(queryData)

  const blogs: BlogGeneralViewInterface[] = await BlogModel.findAll({
    limit,
    offset,
    where: queryObj,
    attributes: ['blogId', 'title', 'body', 'authorId', 'createdAt', 'updatedAt'],
    include: [
      {
        model: AuthorModel,
        attributes: ['name', 'email'],
      },
    ],
  }) as unknown as Array<BlogGeneralViewInterface>

  return blogs
}
const editBlog = async (updateData: BlogUpdateInterface, blogId: string) => {
  const BlogModel = db.db.blogs
  const blog = await BlogModel.update(updateData, { where: { blogId } })

  return blog
}

const isAuthorizedToEditBlog = async (authorId: string, blogId: string) => {
  const BlogModel = db.db.blogs
  const blog = await BlogModel.findOne({
    where: { authorId, blogId },
    plain: true,
  })

  if (blog) return true

  return false
}

const deleteBlog = async (blogId: string) => {
  const BlogModel = db.db.blogs
  const blog = await BlogModel.destroy({ where: { blogId } })

  return blog
}

export default {
  createBlog,
  viewBlogs,
  getSingleBlogById,
  isAuthorizedToEditBlog,
  editBlog,
  deleteBlog,
  viewBlogsByAuthor,
}
