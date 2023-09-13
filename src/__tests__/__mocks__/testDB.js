const authorsDB = [
  {
    authorId: '1d6464d8-2151-4147-810a-a3762a60aa3a',
    name: 'some name',
    email: 'name@gmail.com',
    password: '87654321',
    createdAt: '12-12-12',
    updatedAt: '12-12-12',
  },
  {
    authorId: '1d6464d8-2151-4147-810a-a3762a60aa3a',
    name: 'some name',
    email: 'name@gmail.com',
    password: '87654321',
    createdAt: '12-12-12',
    updatedAt: '12-12-12',
  },
  {
    authorId: '1d6464d8-2151-4147-810a-a3762a60aa3a',
    name: 'some name',
    email: 'name@gmail.com',
    password: '87654321',
    createdAt: '12-12-12',
    updatedAt: '12-12-12',
  },
  {
    authorId: '1d6464d8-2151-4147-810a-a3762a60aa3a',
    name: 'some name',
    email: 'name@gmail.com',
    password: '87654321',
    createdAt: '12-12-12',
    updatedAt: '12-12-12',
  },
  {
    authorId: '1d6464d8-2151-4147-810a-a3762a60aa3a',
    name: 'some name',
    email: 'name@gmail.com',
    password: '87654321',
    createdAt: '12-12-12',
    updatedAt: '12-12-12',
  },
]

const blogsDB = [
  {
    title: 'Hello world',
    body: 'This is a trap',
    authorId: '1ea6c1e5-5649-4591-a813-441d0c840a1b',
    blogId: '383835c5-b60d-40b7-8ca8-de4ae890ca3f',
    updatedAt: '2023-08-30T10:07:25.585Z',
    createdAt: '2023-08-30T10:07:25.585Z',
  },
  {
    title: 'Hello world again',
    body: 'This is a trap again',
    authorId: '1ea6c1e5-5649-4591-a813-441d0c840a1b',
    blogId: '383835c5-b60d-40b7-8ca8-de4ae890ca3f',
    updatedAt: '2023-08-30T10:07:25.585Z',
    createdAt: '2023-08-30T10:07:25.585Z',
  },
]

const blogsWithAuthorDB = [
  {
    authorId: '1d6464d8-2151-4147-810a-a3762a60aa3a',
    authorName: 'sabbir',
    authorEmail: 'sabbir2@gmail.com',
    blogId: '104303d0-0795-42aa-b7bb-31eab3671c26',
    title: 'Hello world',
    body: 'This is body',
    time: '2023-09-05T03:26:42.000Z',
  },
  {
    authorId: '1d6464d8-2151-4147-810a-a3762a60aa3a',
    authorName: 'sabbir',
    authorEmail: 'sabbir2@gmail.com',
    blogId: '6fdbc00c-e362-4502-9651-111367952363',
    title: 'Hello world 2',
    body: 'This is a trap again',
    time: '2023-09-05T03:31:18.000Z',
  },
]

const blogsQueryDB = [
  {
    author: {
      id: '1d6464d8-2151-4147-810a-a3762a60aa3a',
      name: 'sabbir',
      email: 'sabbir2@gmail.com',
    },
    blogId: '104303d0-0795-42aa-b7bb-31eab3671c26',
    title: 'Hello world',
    body: 'This is body',
    time: '2023-09-05T03:26:42.000Z',
  },
  {
    author: {
      id: '1d6464d8-2151-4147-810a-a3762a60aa3a',
      name: 'sabbir',
      email: 'sabbir2@gmail.com',
    },
    blogId: '104303d0-0795-42aa-b7bb-31eab3671c26',
    title: 'Hello world 2',
    body: 'This is body 2',
    time: '2023-09-05T03:26:42.000Z',
  },
]

export default {
  authorsDB, blogsDB, blogsWithAuthorDB, blogsQueryDB,
}
