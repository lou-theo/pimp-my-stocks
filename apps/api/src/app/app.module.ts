import { Module } from '@nestjs/common';

import { YahooController } from './controllers/yahoo.controller';
import { YahooService } from './services/yahoo.service';

@Module({
  imports: [],
  controllers: [YahooController],
  providers: [YahooService],
})
export class AppModule {}
