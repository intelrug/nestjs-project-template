import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class PassengerInput {
  @ApiProperty()
  @Length(50)
  public readonly firstName: string;

  @ApiProperty()
  @Length(50)
  public readonly lastName: string;
}
