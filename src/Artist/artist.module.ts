import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

import { v4 as uuidv4 } from 'uuid';
import { Artist, CreatorArtist } from './artist.interfaces';
import { artistDB, trackDB } from '../db/mockedDB';
import { Artists } from './artist.entity';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable, from } from 'rxjs';
import { Tracks } from 'src/Track/track.entity';
import { Track } from 'src/Track/track.interfaces';

@Module({
  imports: [
    TypeOrmModule.forFeature([Artists]),
    TypeOrmModule.forFeature([Tracks]),
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {
  constructor(
    @InjectRepository(Artists) private artistsRepository: Repository<Artist>,
    @InjectRepository(Tracks) private tracksRepository: Repository<Track>,
  ) {}

  getAllArtists(): Observable<Artist[]> {
    return from(this.artistsRepository.find());
  }

  async getArtistById(id: string): Promise<Artist> {
    return await this.artistsRepository.findOneBy({ id });
  }

  async addArtist(artist: CreatorArtist): Promise<Artist> {
    return await this.artistsRepository.save(artist);
  }

  async udpateArtist(id: string, data: CreatorArtist): Promise<Artist | null> {
    const artist = await this.artistsRepository.findOneBy({ id });
    if (artist) {
      const updatedArtistData = {
        ...artist,
        ...data,
      };
      return await this.artistsRepository.save({
        id,
        ...updatedArtistData,
      });
    }
    return null;
  }

  async deleteArtist(id: string): Promise<boolean> {
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) return false;
    const isArtistDeleted = await !!this.artistsRepository
      .createQueryBuilder()
      .delete()
      .where({ id })
      .execute();
    try {
      const track = await this.tracksRepository.findOneBy({ artistId: id });
      this.tracksRepository.save({
        id: track.id,
        ...track,
        artistId: null,
        albumId: null,
      });
    } catch (error) {
      console.log(error);
    }
    return isArtistDeleted;
  }
}
