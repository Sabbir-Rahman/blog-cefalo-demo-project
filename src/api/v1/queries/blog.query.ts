import { Author } from '../models/authorModel'
import { Blog } from '../models/blogModel'

import { Op } from 'sequelize'
import BlogQueryAllowDto from '../dto/blogs/blogQueryAllow.dto'

import { paginationUtils } from '../utils'
import {
  BlogGeneralViewInterface,
  BlogInterface,
  BlogQueryDataInterface,
  BlogUpdateInterface,
} from '../interfaces/modelInterfaces/blog.interface'
import { InternalServerError } from '../errors'
import { orderBy } from 'lodash'

const createBlog = async (queryData: BlogInterface): Promise<BlogInterface> => {
  const newBlog = await Blog.create({ ...queryData })
  if (!newBlog) {
    throw new InternalServerError(
      'Something wrong blog not created',
      'Something wrong blog not created',
    )
  }

  return newBlog
}

const getSingleBlogById = async (blogId: string) => {
  const blog: BlogGeneralViewInterface = (await Blog.findOne({
    where: { blogId },
    attributes: ['blogId', 'title', 'body', 'authorId', 'createdAt', 'updatedAt'],
    include: [
      {
        model: Author,
        attributes: ['name', 'email'],
      },
    ],
  })) as unknown as BlogGeneralViewInterface

  return blog
}

const viewBlogs = async (queryData: BlogQueryDataInterface) => {
 
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

  const blogs: BlogGeneralViewInterface[] = (await Blog.findAll({
    limit,
    offset,
    where: whereCondition,
    attributes: ['blogId', 'title', 'body', 'authorId', 'createdAt', 'updatedAt'],
    include: [
      {
        model: Author,
        attributes: ['name', 'email'],
      },
    ],
    order: [[sortBy, sortOrder]],
  })) as unknown as Array<BlogGeneralViewInterface>

  return blogs
}

const viewBlogsByAuthor = async (queryData: BlogQueryDataInterface) => {
  const { page, limit, offset } = paginationUtils.getPaginationSearchAndSortInfo(queryData)
  const queryObj = BlogQueryAllowDto.createQueryObject(queryData)

  const blogs: BlogGeneralViewInterface[] = (await Blog.findAll({
    limit,
    offset,
    where: queryObj,
    attributes: ['blogId', 'title', 'body', 'authorId', 'createdAt', 'updatedAt'],
    include: [
      {
        model: Author,
        attributes: ['name', 'email'],
      },
    ],
  })) as unknown as Array<BlogGeneralViewInterface>

  return blogs
}
const editBlog = async (updateData: BlogUpdateInterface, blogId: string) => {
  const blog = await Blog.update(updateData, { where: { blogId } })

  return blog
}

const isAuthorizedToEditBlog = async (authorId: string, blogId: string) => {
  const blog = await Blog.findOne({
    where: { authorId, blogId },
    plain: true,
  })

  if (blog) return true

  return false
}

const deleteBlog = async (blogId: string) => {
  const blog = await Blog.destroy({ where: { blogId } })

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
