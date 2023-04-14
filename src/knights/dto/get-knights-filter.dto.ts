import { IsIn, IsOptional, IsString } from 'class-validator';

export class GetKnightsFilterDto {
  @IsString()
  @IsOptional()
  @IsIn(['heroes'], { message: 'filter type not supported' })
  filter?: string;
}
