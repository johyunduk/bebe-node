export declare function saveCategory(name: string): Promise<void>;
interface itemParam {
    categoryId: number;
    name: string;
    price: number;
    description: string;
}
export declare function saveItem(param: itemParam, file: any): Promise<void>;
export declare function fetchItemList(param: {
    categoryId?: number;
    page?: number;
}): Promise<{
    count: any;
    items: any;
}>;
export declare function fetchCategoryList(): Promise<any>;
export declare function fetchItemDetail(id: number): Promise<any>;
interface modifyParam {
    id: number;
    categoryId: number;
    name: string;
    price: number;
    description: string;
}
export declare function modifyItem(param: modifyParam): Promise<void>;
export {};
