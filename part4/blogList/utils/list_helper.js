const dummy = (blogs) => {
  return 1
}
  
const totalLikes = (blogs) => {
  const likesReducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(likesReducer, 0)
}

const favoriteBlog = (blogs) => {
  let max = blogs[0]
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > max.likes) {
      max = blogs[i]
    }
  }
  return max
}

const mostBlogs = (blogs) => {
  let authors = []
  for (let i = 0; i < blogs.length; i++) {
    const index = authors.findIndex(x => x.author === blogs[i].author)
    if (index != -1) {
      authors[index].blogs += 1
    } else {
      authors = [...authors, {
        author: blogs[i].author,
        blogs: 1
      }]
    }
  }
  let mostAuthor = authors[0]
  for (let i = 0; i < authors.length; i++) {
    if (authors[i].blogs > mostAuthor.blogs) {
      mostAuthor = authors[i]
    }
  }
  return mostAuthor
}

const mostLikes = (blogs) => {
  let authors = []
  for (let i = 0; i < blogs.length; i++) {
    const index = authors.findIndex(x => x.author === blogs[i].author)
    if (index != -1) {
      authors[index].likes += blogs[i].likes
    } else {
      authors = [...authors, {
        author: blogs[i].author,
        likes: blogs[i].likes
      }]
    }
  }
  let mostAuthor = authors[0]
  for (let i = 0; i < authors.length; i++) {
    if (authors[i].likes > mostAuthor.likes) {
      mostAuthor = authors[i]
    }
  }
  return mostAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}