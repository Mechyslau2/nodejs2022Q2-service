import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tracks {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  artistId: string | null;
  @Column()
  albumId: string | null;
  @Column()
  duration: number;
}
