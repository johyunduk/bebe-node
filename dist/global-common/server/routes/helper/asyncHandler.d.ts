declare const asyncHandler: (asyncMiddleware: any) => (req: any, res: any, next?: (message?: any, ...optionalParams: any[]) => void) => void;
export default asyncHandler;
