export declare function userProfile(id: number): Promise<any>;
export declare function updateProfile(body: any, id: number): Promise<void>;
export declare function saveUserAvatar(id: number, file: {
    key: string;
}): Promise<void>;
