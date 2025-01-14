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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}