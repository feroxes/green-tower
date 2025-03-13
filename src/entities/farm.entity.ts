import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { FarmConstants } from '../utils/constants';

@Entity()
export class Farm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: FarmConstants.NAME_MAX_LENGTH })
  name: string;
}
