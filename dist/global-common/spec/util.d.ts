/**
 * model 함수의 mock
*/
export declare function modelMock(model: any): {
    findOne: (returnValue?: any) => void;
    findByPk: (returnValue?: any) => void;
    findAll: (returnValue?: any) => void;
    count: (returnValue?: any) => void;
    update: (mockFn: any) => void;
    create: (mockFn: any) => void;
    bulkCreate: (mockFn: any) => void;
    destroy: (returnValue?: any) => void;
    createReturn: (returnValue?: any) => void;
    sum: (returnValue?: any) => void;
};
export declare function matchObjFn(obj: any): (value: any) => void;
