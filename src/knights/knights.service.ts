import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateKnightDto } from './dto/create-knight.dto';
import { UpdateKnightDto } from './dto/update-knight.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Knight, KnightDocument } from './entities/knight.entity';
import { Model } from 'mongoose';
import { GetKnightsFilterDto } from './dto/get-knights-filter.dto';

@Injectable()
export class KnightsService {
  constructor(
    @InjectModel(Knight.name) private knightModel: Model<KnightDocument>,
  ) {}

  async create(createKnightDto: CreateKnightDto): Promise<Knight> {
    await this.validateKnightExists(createKnightDto);
    const knight = new this.knightModel(createKnightDto);
    return knight.save();
  }

  find(getKnightsFilterDto?: GetKnightsFilterDto) {
    const query = this.buildQuery(getKnightsFilterDto);
    return this.knightModel.find(query);
  }

  async findOne(id: string) {
    const knight = await this.knightModel.findById(id);

    if (!knight) {
      throw new NotFoundException('Knight not found');
    }

    return knight;
  }

  update(id: string, updateKnightDto: UpdateKnightDto) {
    return this.knightModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateKnightDto },
      { new: true },
    );
  }

  async remove(id: string) {
    if (await this.checkKnightIsAlreadyHero(id)) {
      throw new BadRequestException();
    }

    return this.knightModel.findByIdAndUpdate(
      { _id: id },
      { $set: { hero: true } },
      { new: true },
    );
  }

  private buildQuery(getKnightsFilterDto?: GetKnightsFilterDto): object {
    const filter = getKnightsFilterDto?.filter;
    return { hero: filter === 'heroes' };
  }

  private async getKnight(query: object): Promise<Knight> {
    return this.knightModel.findOne(query);
  }

  private async validateKnightExists(
    createKnightDto: CreateKnightDto,
  ): Promise<void> {
    const knight = await this.getKnight({
      nickname: createKnightDto.nickname,
      hero: false,
    });

    if (knight && knight.nickname === createKnightDto.nickname) {
      throw new ConflictException('Knight already exists with this nickname');
    }
  }

  private async checkKnightIsAlreadyHero(id: string): Promise<boolean> {
    const knight = await this.knightModel.findById(id);
    return knight.hero === 1;
  }
}
