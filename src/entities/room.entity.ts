import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('rooms')
@Unique(['userOneId', 'userSecondId'])
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  userOneId: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  userSecondId: number;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'userOneId' })
  userOne: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'userSecondId' })
  userSecond: UserEntity;
}
