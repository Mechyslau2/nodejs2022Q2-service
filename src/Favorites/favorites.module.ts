import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

import { albumDB, artistDB, favoritiesDB, trackDB } from 'src/db/mockedDB';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {
  getAllFavorities() {
    return favoritiesDB;
  }

  addFavoritiesTrack(id: string): boolean {
    const track = trackDB.find((trackId) => trackId.id === id);
    if (track) {
      favoritiesDB.tracks.push(id);
      return true;
    }
    return false;
  }

  deleteFavoritesTrack(id: string): boolean {
    const trackInd = trackDB.findIndex((trackId) => trackId.id === id);
    if (trackInd >= 0) {
      const favorInd = favoritiesDB.tracks.findIndex(
        (trackId) => trackId === id,
      );
      favoritiesDB.tracks.splice(favorInd, 1);
      trackDB.splice(trackInd, 1);
      return true;
    }
    return false;
  }

  addAlbum(id: string): boolean {
    const album = albumDB.find((albumId) => albumId.id === id);
    if (album) {
      favoritiesDB.albums.push(id);
      return true;
    }
    return false;
  }

  deleteFavoritesAlbum(id: string): boolean {
    const albumInd = albumDB.findIndex((albumId) => albumId.id === id);
    if (albumInd >= 0) {
      const favorInd = favoritiesDB.tracks.findIndex(
        (albumId) => albumId === id,
      );
      favoritiesDB.albums.splice(favorInd, 1);
      albumDB.splice(albumInd, 1);
      return true;
    }
    return false;
  }

  addArtist(id: string): boolean {
    const artist = artistDB.find((artistId) => artistId.id === id);
    if (artist) {
      favoritiesDB.artists.push(id);
      return true;
    }
    return false;
  }

  deleteFavoritesArtist(id: string): boolean {
    const artistInd = artistDB.findIndex((artistId) => artistId.id === id);
    if (artistInd >= 0) {
      const favorInd = favoritiesDB.artists.findIndex(
        (artistId) => artistId === id,
      );
      favoritiesDB.artists.splice(favorInd, 1);
      artistDB.splice(artistInd, 1);
      return true;
    }
    return false;
  }
}
