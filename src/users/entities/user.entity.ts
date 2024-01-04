import { Column, DeleteDateColumn, Entity, JoinColumn, OneToOne } from "typeorm";
import { Profile } from "./profile.entity";

@Entity()
export class User {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ length: 500 })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: "user" })
  rol: string;
  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @DeleteDateColumn()
  deletedAt: Date;
}