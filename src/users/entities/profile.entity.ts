import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('users_profile')
class Profile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column({ type: 'date' })
  birth_day: string;
  @Column()
  photo_path: string;
  @Column()
  phone: string;
  @Column({ type: 'varchar', length: 1000, nullable: true, default: '' })
  info_description: string;

  age: number;

  @Column({ type: 'time', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;
}

export { Profile };
