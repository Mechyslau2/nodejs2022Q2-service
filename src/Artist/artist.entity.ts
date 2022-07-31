import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artists {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  grammy: boolean;
}
