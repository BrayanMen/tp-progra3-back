import mysql from 'mysql2/promise';
import config from '../config/config.js';
import path from 'path'
import fs from 'fs'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const { db } = config;

const connection = mysql.createPool({
    host: db.host,
    database: db.name,
    user: db.user,
    password: db.password,
    waitForConnections: true,
});

const conectionInitialDatabase = async ()=>{
    try{
       const connectTemp = await mysql.createConnection({
            host: db.host,
            user: db.user,
            password:db.password,
        });

        await connectTemp.query(`CREATE DATABASE IF NOT EXISTS ${db.name}`);
        await connectTemp.query(`USE ${db.name}`);

        const scriptSQL = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8')
        await connectTemp.query(scriptSQL)

        //Posiblemente condicionarlo a que solo insert los haga en Desarrollo
        if (config.env === 'development') {
            const insertsSQL = fs.readFileSync(path.join(__dirname, 'inserts.sql'), 'utf8');
            await connectTemp.query(insertsSQL);
        }
        console.log('database initialized successfully...');
        
        
    }catch(err){
        console.error("Error de conexion de DB: ", err)       
    }
}

export  {connection, conectionInitialDatabase};
