import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateKnightDto {
  @IsNotEmpty()
  @IsString()
  nickname: string;
}
