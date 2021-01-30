import {
  Body, Controller, Get, HttpStatus, Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoggerService } from '~/modules/common/provider';
import { PassengerService } from '~/modules/passenger/service';
import { PassengerData, PassengerInput } from '~/modules/passenger/model';

@Controller('passengers')
@ApiTags('passenger')
@ApiBearerAuth()
export class PassengerController {
  public constructor(
    private readonly logger: LoggerService,
    private readonly passengerService: PassengerService,
  ) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, isArray: true, type: PassengerData })
  public async find(): Promise<PassengerData[]> {
    const passengers = await this.passengerService.find();

    return passengers.map((passenger) => passenger.buildData());
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: PassengerData })
  public async create(@Body() input: PassengerInput): Promise<PassengerData> {
    const passenger = await this.passengerService.create(input);
    this.logger.info(`Created new passenger with ID ${passenger.id}`);

    return passenger.buildData();
  }
}
