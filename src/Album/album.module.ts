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

@Module({
  imports: [
    TypeOrmModule.forFeature([Albums]),
    TypeOrmModule.forFeature([Artists]),
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {
  constructor(
    @InjectRepository(Albums) private albumsRepository: Repository<Album>,
    @InjectRepository(Artists) private artistsRepository: Repository<Artist>,
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
      this.artistsRepository
        .createQueryBuilder()
        .delete()
        .where({ id: album.artistId })
        .execute();
    } catch (error) {
      console.log(error);
    }
    return isAlbumDeleted;
  }
}
