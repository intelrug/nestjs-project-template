import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from '~/modules/common';
import { PassengerModule } from '~/modules/passenger';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forRoot(),
    PassengerModule,
  ],
})
export class ApplicationModule {}
