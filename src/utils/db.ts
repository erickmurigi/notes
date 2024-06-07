import sql from 'mssql';
import config from '../dbconfig';

export const connectDB = async () => {
  try {
    await sql.connect(config as sql.config);
    console.log('Connected to MSSQL');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
};
