import { registerAs } from '@nestjs/config';
import path from 'path';

export default registerAs('main', () => ({
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  rootDir: process.env.ROOT_DIR || path.resolve(__dirname, '../'),
}));
