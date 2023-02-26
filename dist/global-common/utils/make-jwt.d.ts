import { UserType } from '@global-common/constants/enum';
export declare function makeJWT(id: number, type: UserType, deviceId?: string): {
    accessToken: string;
    refreshToken: string;
};
export declare function makeNewAccessToken(id: number, type: UserType, deviceId?: string): {
    accessToken: string;
};
