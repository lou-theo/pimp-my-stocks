import { Test, TestingModule } from '@nestjs/testing';

import { YahooController } from './yahoo.controller';
import { YahooService } from '../services/yahoo.service';

describe('YahooController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [YahooController],
      providers: [YahooService],
    }).compile();
  });
});
