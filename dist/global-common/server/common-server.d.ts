import { connectDb as commonConnectDb } from '@global-common/db/db-setup';
export default function runServer({ preConfig, main, port, connectDb, }: {
    preConfig?: any;
    main: any;
    port: any;
    connectDb?: typeof commonConnectDb;
}): import("express-serve-static-core").Express;
