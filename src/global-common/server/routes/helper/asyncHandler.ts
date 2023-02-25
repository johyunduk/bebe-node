const defaultErrorHandler = console.error

const asyncHandler = (asyncMiddleware) => (req, res, next = defaultErrorHandler) => {
  Promise.resolve(asyncMiddleware(req, res, next)).catch(next)
}

export default asyncHandler
