import { Module } from '@nestjs/common';
import { EditorialesController } from './editoriales.controller';
import { EditorialesService } from './editoriales.service';
import { Editorial } from './entities/editorial.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Editorial])
  ],
  controllers: [EditorialesController],
  providers: [EditorialesService]
})
export class EditorialesModule {}
