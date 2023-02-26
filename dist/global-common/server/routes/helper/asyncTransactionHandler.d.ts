declare const asyncTransactionHandler: (route: any) => (req: any, res: any, next?: (message?: any, ...optionalParams: any[]) => void) => void;
export default asyncTransactionHandler;
