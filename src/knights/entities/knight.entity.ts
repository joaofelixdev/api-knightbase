import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type KnightDocument = HydratedDocument<Knight>;

@Schema()
export class Knight {
  @Prop()
  name: string;

  @Prop()
  nickname: string;

  @Prop()
  dateOfBirth: Date;

  @Prop()
  weapons: Array<string>;

  @Prop()
  attributes: Array<string>;

  @Prop()
  hero: number;
}

export const KnightSchema = SchemaFactory.createForClass(Knight);
