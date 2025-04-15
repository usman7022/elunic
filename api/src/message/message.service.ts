import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMessage } from '../entities/user-message.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(UserMessage)
    private userMessageRepository: Repository<UserMessage>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<UserMessage> {
    const message = this.userMessageRepository.create(createMessageDto);
    return this.userMessageRepository.save(message);
  }

  async findAll(page = 1, limit = 3): Promise<{ messages: UserMessage[]; total: number }> {
    const [messages, total] = await this.userMessageRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { messages, total };
  }

  async createTestMessages(): Promise<void> {
    const testMessages = [];
    for (let i = 1; i <= 10; i++) {
      testMessages.push({
        name: `Test User ${i}`,
        message: `This is test message ${i}. Created for testing pagination.`,
      });
    }

    await this.userMessageRepository.save(testMessages);
  }
}