import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';

import { Album, AlbumCreator } from './album.interface';
import { AlbumController } from './album.controller';
import { Albums } from './album.entity';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable, from } from 'rxjs';
import { Artists } from 'src/Artist/artist.entity';
import { Artist } from 'src/Artist/artist.interfaces';
import { Track } from 'src/Track/track.interfaces';
import { Tracks } from 'src/Track/track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Albums]),
    TypeOrmModule.forFeature([Artists]),
    TypeOrmModule.forFeature([Tracks]),
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {
  constructor(
    @InjectRepository(Albums) private albumsRepository: Repository<Album>,
    @InjectRepository(Artists) private artistsRepository: Repository<Artist>,
    @InjectRepository(Tracks) private tracksRepository: Repository<Track>,
  ) {}

  getAllAlbums(): Observable<Album[]> {
    return from(this.albumsRepository.find());
  }

  async getAlbumById(id: string): Promise<Album> {
    const album = await this.albumsRepository.findOneBy({ id });
    return album;
  }

  async addAlbum(album: AlbumCreator): Promise<Album> {
    return await this.albumsRepository.save(album);
  }

  async updateAlbum(id: string, data: Album): Promise<Album | null> {
    const album = await this.albumsRepository.findOneBy({ id });
    if (album) {
      const updatedAlbum = {
        ...album,
        ...data,
      };
      return await this.albumsRepository.save({
        id: album.id,
        ...updatedAlbum,
      });
    }
    return null;
  }

  async deleteAlbum(id: string): Promise<boolean> {
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album) return false;
    const isAlbumDeleted = await !!this.albumsRepository
      .createQueryBuilder()
      .delete()
      .where({ id })
      .execute();
    try {
      await this.artistsRepository
        .createQueryBuilder()
        .delete()
        .where({ id: album.artistId })
        .execute();
      const track = await this.tracksRepository.findOneBy({ albumId: id });
      await this.tracksRepository.save({
        id: track.id,
        ...track,
        albumId: null,
      });
    } catch (error) {
      console.log(error);
    }
    return isAlbumDeleted;
  }
}
