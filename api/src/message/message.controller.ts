import { Controller, Get, Post, Body, Query, HttpStatus } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UserMessage } from '../entities/user-message.entity';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    const message = await this.messageService.create(createMessageDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Message created successfully',
      data: message,
    };
  }

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 3) {
    const { messages, total } = await this.messageService.findAll(+page, +limit);
    return {
      statusCode: HttpStatus.OK,
      data: messages,
      meta: {
        total,
        page: +page,
        limit: +limit,
        totalPages: Math.ceil(total / +limit),
      },
    };
  }

  @Post('test-data')
  async createTestData() {
    await this.messageService.createTestMessages();
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Test messages created successfully',
    };
  }

  @Get('hello')
  getHello() {
    return {
      message: 'hello',
      items: [1, 2, 3]
    };
  }
}