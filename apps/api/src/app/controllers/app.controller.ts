import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { MyMessage } from '../models/message.dto';

import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: MyMessage,
  })
  getData(): MyMessage {
    return this.appService.getData();
  }
}
