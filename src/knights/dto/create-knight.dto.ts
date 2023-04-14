import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateKnightDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsArray()
  weapons: Array<string>;

  @IsNotEmpty()
  @IsArray()
  attributes: Array<string>;

  @IsNumber()
  hero: number;
}
