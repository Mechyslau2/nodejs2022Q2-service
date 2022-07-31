import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', array: true })
  artists: string[];

  @Column({ type: 'varchar', array: true })
  tracks: string[];

  @Column({ type: 'varchar', array: true })
  albums: string[];

  toSend() {
    const { tracks, artists, albums } = this;
    return { tracks, artists, albums };
  }
}
