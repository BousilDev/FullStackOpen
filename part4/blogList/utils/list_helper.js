const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    const likesReducer = (sum, item) => {
        return sum + item.likes
      }
    return blogs.reduce(likesReducer, 0)
}

  module.exports = {
    dummy,
    totalLikes
  }