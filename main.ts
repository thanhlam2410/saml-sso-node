import dotenv from 'dotenv';
dotenv.config();
import { createApiServer } from './src/server';

const server = createApiServer(__dirname);
server.listen(process.env.PORT, () =>
  console.log(`running on ${process.env.PORT}`)
);
