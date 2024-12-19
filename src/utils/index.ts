export const hasNullValue = (object: { [key: string]: any }) => {
  return Object.keys(object).filter((key) => object[key] === null)
}
