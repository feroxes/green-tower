import { IsString, MaxLength } from 'class-validator';
import { FarmConstants } from '../utils/constants';

export class FarmCreateDto {
  @IsString()
  @MaxLength(FarmConstants.NAME_MAX_LENGTH)
  name: string;
}
