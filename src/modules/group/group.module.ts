import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Group]),
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
