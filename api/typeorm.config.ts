import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { UserMessage } from './src/entities/user-message.entity';
import { CreateUserMessageTable1718452201234 } from './src/migrations/1718452201234-CreateUserMessageTable';

// Load environment variables
config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: process.env.APP_DB_HOST || 'localhost',
  port: parseInt(process.env.APP_DB_PORT || '3306', 10),
  username: process.env.APP_DB_USER || 'app',
  password: process.env.APP_DB_PASS || 'app',
  database: process.env.APP_DB_NAME || 'app',
  entities: [UserMessage],
  migrations: [CreateUserMessageTable1718452201234],
});