import { Get, HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    
  ) {}
  @Post()
  async create(createTaskDto: CreateTaskDto) {
    const foundStatus = await this.statusRepository.findOne({where:{name:'Iniciado'}})
    if(!foundStatus){
      throw  new HttpException('El estado inicial no existe', HttpStatus.CONFLICT);
    }
    let newTask = await this.taskRepository.create(createTaskDto);
    newTask.status = foundStatus
    return this.taskRepository.save(newTask);  
  }

  @Get()
  async findAll() {
    const taskList = await this.taskRepository.find({where:{deletedAt:null}});
    if (!taskList)
      return new HttpException('No se ha encontrado resultados', HttpStatus.NOT_FOUND);
    else return taskList;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
