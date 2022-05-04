import { Test } from '@nestjs/testing';

import { YahooService } from './yahoo.service';

describe('YahooService', () => {
  let service: YahooService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [YahooService],
    }).compile();

    service = app.get<YahooService>(YahooService);
  });
});
