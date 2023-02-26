interface JoinInputs {
    name: string;
    email: string;
    password: string;
    gender: string;
    birthDate: string;
}
export declare function userJoin(body: JoinInputs): Promise<void>;
export declare function userLogin(email: string, password: string): Promise<{
    accessToken: string;
    refreshToken: string;
    user: {
        id: any;
        name: any;
    };
}>;
export declare function userLogout(id: number): Promise<void>;
export {};
