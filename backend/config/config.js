import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 8080,
    env: process.env.NODE_ENV || 'development',
    db: {
        host: process.env.DB_HOST || 'localhost',
        name: process.env.DB_NAME || 'testdb',
        user: process.env.DB_USER || 'user',
        password: process.env.DB_PASSWORD || 'password',
    },
};

export default config;
