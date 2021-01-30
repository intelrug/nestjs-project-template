import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PassengerData } from '.';

@Entity({ name: 'passengers' })
export class Passenger {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 50,
  })
  public firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 50,
  })
  public lastName: string;

  public buildData(): PassengerData {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
    };
  }
}
