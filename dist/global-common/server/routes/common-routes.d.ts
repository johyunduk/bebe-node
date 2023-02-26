interface CommonRouteParam {
    router: any;
    getDB: any;
    routePath: any;
    serverInfo: any;
}
export default function commonRoute({ router, getDB, routePath, serverInfo, }: CommonRouteParam): Promise<any>;
export {};
