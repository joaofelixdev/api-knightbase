import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KnightsModule } from './knights/knights.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dev-knightbase:Eo0O1WyEw7rLNGCg@knightscluster0.xepsds2.mongodb.net/test',
    ),
    KnightsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
