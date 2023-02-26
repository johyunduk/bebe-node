/**
 * db를 sync 하다가 db가 없다고 할 때, db를 생성하고 sync해주는 함수.
 * @param toSyncDb sync할 db의 sequelize instance
 * @param DB_URL database가 없을 때, db를 생성하기 위해 db 접속 url도 받음.
 */
export default function ensuredSync(toSyncDb: any, DB_URL: any): Promise<void>;
