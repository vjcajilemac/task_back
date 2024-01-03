import {
    Entity,
    Column,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';

import { Status } from './status.entity';

@Entity({ name: 'tasks' })
export class Task {
    @PrimaryGeneratedColumn()
    id?:number;
    @Column()
    name: string;
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    due_date?: string;
    @Column()
    observation?: string;
    @CreateDateColumn()
    createAt:Date;
    @UpdateDateColumn()
    updatedAt:Date;
    @DeleteDateColumn()
    deletedAt: Date;
    @ManyToOne(() => Status, status => status.task)
    @JoinColumn({ name: 'statusId' })
    status: Status
}
