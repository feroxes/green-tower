import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { FarmConstants } from '../utils/constants';
import { User } from './user.entity';
import { Plant } from './plant.entity';

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
