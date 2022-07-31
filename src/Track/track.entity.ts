import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tracks {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ type: 'varchar', nullable: true })
  artistId: string | null;
  @Column({ type: 'varchar', nullable: true })
  albumId: string | null;
  @Column({ type: 'varchar', nullable: true })
  duration: number;
}
