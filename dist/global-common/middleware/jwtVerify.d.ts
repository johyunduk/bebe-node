export declare function getJWT(req: any): any;
export declare function hasJWT(req: any): boolean;
export declare const extractUserFromJwt: (token: string, userType: any) => Promise<{
    id: any;
    deviceId: any;
}>;
export declare function jwtGuard(userType: any, req: any): Promise<{
    id: any;
    deviceId: any;
}>;
export declare function refreshGuard(userType: any, req: any, refreshToken: any): Promise<{
    id: any;
    deviceId: any;
}>;
