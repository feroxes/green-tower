import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Plant } from './plant.entity';
import { User } from './user.entity';

import { FarmConstants } from '../utils/constants';

@Entity()
export class Farm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: FarmConstants.NAME_MAX_LENGTH })
  name: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @OneToMany(() => User, (user: User) => user.farm)
  users: User[];

  @OneToMany(() => Plant, (user: Plant) => user.farm)
  plants: Plant[];
}
