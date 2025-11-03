import pkg from '../node_modules/@types/pg';
const {Pool} = pkg; 

export const pool = new Pool({
    connectionString : process.env.DATABASE_URL,
});
