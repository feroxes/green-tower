import { Plant } from './plant.entity';
import { User } from './user.entity';
export declare class Farm {
    id: string;
    name: string;
    owner: User;
    users: User[];
    plants: Plant[];
    version: number;
    createdAt: Date;
    updatedAt: Date;
}
