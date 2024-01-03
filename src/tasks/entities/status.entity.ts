import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,

  } from 'typeorm';
import { Task } from './task.entity';
@Entity({ name: 'status' })
export class Status {
    @PrimaryGeneratedColumn()
    id?:number;
    @Column()
    name: string;
    @Column()
    color?: string;
    @OneToMany(() => Task, task => task.status)
    task: Task[];

}
