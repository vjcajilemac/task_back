import { Delete, Get, HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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
  async findAll(searchString: string) {
    const taskList = await this.taskRepository.find({where:[{deletedAt:null},{ name: Like(`%${searchString}%`) }], relations:['status']});
    /*const taskList = await this.taskRepository
      .createQueryBuilder('tasks')
      .leftJoinAndSelect('tasks.status', 'status') // Cargar la información del estado relacionado
      .where('tasks.name LIKE :searchString', { searchString: `%${searchString}%` })
      .orWhere('status.name LIKE :searchString', { searchString: `%${searchString}%` })
      .getMany();*/
      
      
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

  @Delete()
  async remove(id: number) {
    const nowDate = new Date();
    const foundStatus = await this.statusRepository.findOne({where:{name:"Eliminado"}})
    const foundTask = await this.taskRepository.findOne({where:{id}});
    (await foundTask).deletedAt = nowDate;
    (await foundTask).status = foundStatus

    return this.taskRepository.save(foundTask);
  }
}
