import {
    Entity,
    Column,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,

  } from 'typeorm';
import { Status } from './status.entity';
@Entity({ name: 'tasks' })
export class Task {
    @PrimaryGeneratedColumn()
    id?:number;
    @Column()
    name: string;
    @Column()
    due_date?: string;
    @Column()
    observation?: string;
    @DeleteDateColumn()
    deletedAt: Date;
    @ManyToOne(() => Status, status => status.task)
    status: Status
    
}
