require('dotenv').config();

const DEFAULT_SERVER_PORT = 3000;
const DEFAULT_NODE_ENV = 'develop';

const config = {
    env: process.env.NODE_ENV || DEFAULT_NODE_ENV,
    serverPort: DEFAULT_SERVER_PORT,
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dbName: process.env.DB_NAME,
        password: process.env.DB_PASSWORD
    }
};