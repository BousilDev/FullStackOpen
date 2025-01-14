const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

const blogs = testHelper.blogs
const listWithOneBlog = testHelper.listWithOneBlog

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
    })

    test('when list has multiple blogs, equals the total likes', () => {
      const result = listHelper.totalLikes(blogs)
      assert.strictEqual(result, 36)
    })
  })

describe('favorite blog', () => {
    test('is the given blog when the list contains only one blog', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        assert.deepStrictEqual(result, listWithOneBlog[0])
    })
    test('when list has many blogs is the blog with most likes', () => {
        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, blogs[2])
    })
})

describe('author with most blogs', () => {
    test('is the author of the given blog when the list contains only one blog', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        const correct = {author: 'Edsger W. Dijkstra', blogs: 1}
        assert.deepStrictEqual(result, correct)
    })
    test('when given many blogs is the author with most blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        const correct = {author: "Robert C. Martin", blogs: 3}
        assert.deepStrictEqual(result, correct)
    })
})

describe('author with most likes', () => {
  test('is the author of the given blog when the list contains only one blog', () => {
      const result = listHelper.mostLikes(listWithOneBlog)
      const correct = {author: 'Edsger W. Dijkstra', likes: 5}
      assert.deepStrictEqual(result, correct)
  })
  test('when given many blogs is the author with most likes', () => {
      const result = listHelper.mostLikes(blogs)
      const correct = {author: "Edsger W. Dijkstra", likes: 17}
      assert.deepStrictEqual(result, correct)
  })
})