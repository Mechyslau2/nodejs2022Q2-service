import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Albums {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  year: number;
  @Column()
  artistId: string | null;
}
