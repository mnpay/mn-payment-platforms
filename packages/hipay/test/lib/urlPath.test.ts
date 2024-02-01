import { expect, test } from 'vitest'
import { getHipayUrlPath } from 'mn-hipay/lib'

test('getHipayUrlPath should replace all :key with the corresponding values from the params object', () => {
  const rawPath = '/users/:id/posts/:postId/:postId'
  const params = { id: 1, postId: 2 }

  const expectedUrlPath = '/users/1/posts/2/2'
  const actualUrlPath = getHipayUrlPath(rawPath, params)

  expect(actualUrlPath).toBe(expectedUrlPath)
})

test('getHipayUrlPath should return an empty string if the value of a parameter is not a string or a number', () => {
  const rawPath = '/users/:id/posts/:postId'
  const params = { id: 1, postId: {} }

  const expectedUrlPath = '/users/1/posts/'
  const actualUrlPath = getHipayUrlPath(rawPath, params)

  expect(actualUrlPath).toBe(expectedUrlPath)
})

test('getHipayUrlPath should return the raw path if no params are provided', () => {
  const rawPath = '/users/:id/posts/:postId'

  const expectedUrlPath = '/users//posts/'
  const actualUrlPath = getHipayUrlPath(rawPath)

  expect(actualUrlPath).toBe(expectedUrlPath)
})
