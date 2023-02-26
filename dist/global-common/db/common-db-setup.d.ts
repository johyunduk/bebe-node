import { Sequelize } from 'sequelize';
import ensuredSync from './ensuredSync';
export declare function newSequelize(url: any, options?: any): Promise<Sequelize>;
export declare function loadAllModel(modelPath: any): Promise<void>;
export declare const setDB: (dbName: any, db: any) => void;
export declare const getDB: (dbName: any) => any;
/**
 * db를 sync 하다가 db가 없다고 할 때, db를 생성하고 sync해주는 함수.
 * @param toSyncDb sync할 db의 sequelize instance
 * @param DB_URL database가 없을 때, db를 생성하기 위해 db 접속 url도 받음.
 */
export declare const ensureDbExistsAndSync: typeof ensuredSync;
export default Sequelize;
