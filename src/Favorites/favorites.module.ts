import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

import { Track } from 'src/Track/track.interfaces';
import { Album } from 'src/Album/album.interface';
import { Artist } from 'src/Artist/artist.interfaces';
import { Favorites } from './favorites.entity';
import { FavoritesI } from './falvorities.interfaces';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tracks } from 'src/Track/track.entity';
import { Albums } from 'src/Album/album.entity';
import { Artists } from 'src/Artist/artist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorites]),
    TypeOrmModule.forFeature([Tracks]),
    TypeOrmModule.forFeature([Albums]),
    TypeOrmModule.forFeature([Artists]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {
  constructor(
    @InjectRepository(Favorites)
    private favoritesRepository: Repository<Favorites>,
    @InjectRepository(Tracks)
    private tracksRepository: Repository<Track>,
    @InjectRepository(Albums)
    private albumsRepository: Repository<Album>,
    @InjectRepository(Artists)
    private artistsRepository: Repository<Artist>,
  ) {
    const fav = this.favoritesRepository.findOneBy({ id: 1 });
    if (!fav) {
      this.favoritesRepository.save({
        id: 1,
        artists: [],
        albums: [],
        tracks: [],
      });
    }
  }

  async getAllFavorities(): Promise<FavoritesI> {
    return await this.favoritesRepository
      .createQueryBuilder()
      .select(['artists', 'albums', 'tracks'])
      .where({ id: 1 })
      .getRawOne();
  }

  async addFavoritiesTrack(id: string): Promise<boolean> {
    const track = await this.tracksRepository.findOneBy({ id });
    if (track) {
      const favorites = await this.favoritesRepository.find();
      await this.favoritesRepository.save({
        tracks: [...favorites[0].tracks, id],
      });
      return true;
    }
    return false;
  }

  async deleteFavoritesTrack(id: string): Promise<boolean> {
    const favorites = await this.favoritesRepository.find();
    const isTrackExists = favorites[0].tracks.find((track) => track === id);
    if (isTrackExists) {
      const updatedTrackList = favorites[0].tracks.filter(
        (track) => track !== id,
      );
      await this.favoritesRepository.save({
        id: 1,
        tracks: [...updatedTrackList],
      });
      return true;
    }
    return false;
  }

  async addAlbum(id: string): Promise<boolean> {
    const album = await this.albumsRepository.findOneBy({ id });
    if (album) {
      const favorites = await this.favoritesRepository.find();
      await this.favoritesRepository.save({
        id: 1,
        albums: [...favorites[0].albums, id],
      });
      return true;
    }
    return false;
  }

  async deleteFavoritesAlbum(id: string): Promise<boolean> {
    const favorites = await this.favoritesRepository.find();
    const isAlbumExists = favorites[0].albums.find((album) => album === id);
    if (isAlbumExists) {
      const updatedAlbumList = favorites[0].albums.filter(
        (album) => album !== id,
      );
      await this.favoritesRepository.save({
        id: 1,
        albums: [...updatedAlbumList],
      });
      return true;
    }
    return false;
  }

  async addArtist(id: string): Promise<boolean> {
    const artist = await this.artistsRepository.findOneBy({ id });
    if (artist) {
      const favorites = await this.favoritesRepository.find();
      await this.favoritesRepository.save({
        id: 1,
        artists: [...favorites[0].artists, id],
      });
      return true;
    }
    return false;
  }

  async deleteFavoritesArtist(id: string): Promise<boolean> {
    const favorites = await this.favoritesRepository.find();
    const isArtistExists = favorites[0].artists.find((artist) => artist === id);
    if (isArtistExists) {
      const updatedArtistList = favorites[0].artists.filter(
        (artist) => artist !== id,
      );
      await this.favoritesRepository.save({
        id: 1,
        artists: [...updatedArtistList],
      });
      return true;
    }
    return false;
  }
}
