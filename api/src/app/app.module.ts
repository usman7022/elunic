import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { createConnection } from 'mysql2/promise';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserMessage } from '../entities/user-message.entity';
import { MessageController } from '../message/message.controller';
import { MessageService } from '../message/message.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        // First, create the database if it doesn't exist
        try {
          const connection = await createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '', // Add your root password if needed
          });
          
          await connection.query(`CREATE DATABASE IF NOT EXISTS \`app\`;`);
          console.log('Database "app" created or already exists.');
          
          // Create the app user if it doesn't exist
          await connection.query(`CREATE USER IF NOT EXISTS 'app'@'localhost' IDENTIFIED BY 'app';`);
          await connection.query(`GRANT ALL PRIVILEGES ON app.* TO 'app'@'localhost';`);
          await connection.query(`FLUSH PRIVILEGES;`);
          console.log('User "app" created and granted privileges.');
          
          await connection.end();
        } catch (err) {
          console.error('Error initializing database:', err);
        }
        
        // Return TypeORM config for the main connection
        return {
          type: 'mysql' as const,
          host: process.env.APP_DB_HOST || 'localhost',
          port: parseInt(process.env.APP_DB_PORT || '3306', 10),
          username: 'root', // We'll continue using root for now to avoid connection issues
          password: '', // Add your root password if needed
          database: process.env.APP_DB_NAME || 'app',
          entities: [UserMessage],
          synchronize: true, // Enable auto-sync for development
          logging: true,
          retryAttempts: 3,
          retryDelay: 5000,
          connectTimeout: 30000,
        };
      },
    }),
    TypeOrmModule.forFeature([UserMessage]),
  ],
  controllers: [AppController, MessageController],
  providers: [AppService, MessageService],
})
export class AppModule {}
