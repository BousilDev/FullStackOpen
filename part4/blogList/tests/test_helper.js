const Blog = require('../models/blog')
const User = require('../models/user')

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d18f9',
      title: 'Go To Statement Considered Harmful, test edition',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

const noLikes = {
    _id: '5a422aa71b54a676237af485',
    title: 'Like property missing',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    __v: 0
}

const noTitle = {
    _id: '4a522aa71b54a676237af485',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
}

const noUrl = {
    _id: '5a422aa71b54a789234d18f9',
    title: 'No url',
    author: 'Edsger W. Dijkstra',
    likes: 5,
    __v: 0
  }

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const users = [
  {
    _id: '5a422aa71b5c4789234d18f9',
    username: "eki",
    name: "eero",
    password: "moniste",
    __v: 0
  },
  {
    _id: '8a422aa7163c4789234d18f9',
    username: "jari",
    name: "markku",
    password: "koni",
    __v: 0
  }
]

const testUser = {
  username: "testMan",
  name: "tester",
  password: "testi"
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
    blogs,
    listWithOneBlog,
    blogsInDb, 
    noLikes, 
    noTitle,
    noUrl,
    users,
    testUser,
    usersInDb
}