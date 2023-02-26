export declare function testApi(baseURL: any, symbol: any, errorLogOn?: boolean): any;
export declare function getApi(baseURL: any, errorLogOn?: boolean): any;
export declare function getDBApi<T extends string>(baseURL: any, db: any): {
    count(table: T, condition?: any): Promise<any>;
    selectLast(table: T): Promise<any>;
    selectOne(table: T, condition?: any): Promise<any>;
    select(table: T, condition?: any): Promise<any>;
    delete(table: T, condition?: any): Promise<any>;
    insert(table: T, object: any): Promise<any>;
    update(table: T, toUpdate: any, where: any): Promise<any>;
    ensureExist(table: T, object: any, targetColumn: string, query?: any): Promise<any>;
};
