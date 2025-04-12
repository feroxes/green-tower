import { IsNotEmpty, IsUUID } from 'class-validator';

export class FarmGetDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
