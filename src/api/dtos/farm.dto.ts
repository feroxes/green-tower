import { IsUUID } from 'class-validator';

export class FarmGetDto {
  @IsUUID()
  id: string;
}
