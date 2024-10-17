const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')


describe('sum of likes', () => {

    test('of empty array is 0', () => {
        const blogs = []

        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 0)
    })

    test('sum of array works', () => {
        const blogs = [

            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 15,
                __v: 0
            }
        ]

        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 20)
    })

})