export const isPromise = (x: any): x is Promise<any> => {
  return x && Object.prototype.toString.call(x) === '[object Promise]'
}
