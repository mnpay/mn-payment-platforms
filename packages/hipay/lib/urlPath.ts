// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getHipayUrlPath = <T extends string = string, P extends Record<string, any> = Record<string, any>>(
  rawPath: T,
  params?: P,
) => {
  const regex = /:([a-zA-Z0-9]+)/g

  return rawPath.replace(regex, (_match, key) => {
    const value = typeof params?.[key] === 'string' || typeof params?.[key] === 'number' ? params[key] : ''

    return value.toString()
  })
}
