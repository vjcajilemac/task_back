import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Status])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
