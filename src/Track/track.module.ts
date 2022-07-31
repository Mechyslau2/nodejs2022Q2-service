import { Module } from '@nestjs/common';
import { albumDB, artistDB, trackDB } from 'src/db/mockedDB';
import { TrackController } from './track.controller';
import { Track, TrackCreator } from './track.interfaces';
import { v4 as uuidv4 } from 'uuid';

import { TrackService } from './track.service';
import { Tracks } from './track.entity';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { Artists } from 'src/Artist/artist.entity';
import { Albums } from 'src/Album/album.entity';
import { Artist } from 'src/Artist/artist.interfaces';
import { Album } from 'src/Album/album.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tracks]),
    TypeOrmModule.forFeature([Artists]),
    TypeOrmModule.forFeature([Albums]),
  ],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {
  constructor(
    @InjectRepository(Tracks) private tracksRepository: Repository<Track>,
    @InjectRepository(Artists) private artistsRepository: Repository<Artist>,
    @InjectRepository(Albums) private albumsRepository: Repository<Album>,
  ) {}

  getAllTracks(): Observable<Track[]> {
    return from(this.tracksRepository.find());
  }

  async getTrackById(id: string): Promise<Track> {
    return await this.tracksRepository.findOneBy({ id });
  }

  async createTrack(track: TrackCreator): Promise<Track> {
    return await this.tracksRepository.save(track);
  }

  async updateTrack(id: string, trackData: Track): Promise<Track | null> {
    const track = await this.tracksRepository.findOneBy({ id });
    if (track) {
      const updatedTrackData = {
        ...track,
        ...trackData,
      };
      return await this.tracksRepository.save({
        id,
        ...updatedTrackData,
      });
    }
    return null;
  }

  async deleteTrack(id: string): Promise<boolean> {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) return false;
    const isTrackDeleted = await !!this.tracksRepository
      .createQueryBuilder()
      .delete()
      .where({ id })
      .execute();
    try {
      const artist = await this.artistsRepository.findOneBy({
        id: track.artistId,
      });
      this.artistsRepository.save({
        id: artist.id,
        trackId: null,
      });
      const album = await this.albumsRepository.findOneBy({ artistId: id });
      this.albumsRepository.save({
        id: album.id,
        artistId: null,
      });
    } catch (error) {
      console.log(error);
    }
    return isTrackDeleted;
  }
}
