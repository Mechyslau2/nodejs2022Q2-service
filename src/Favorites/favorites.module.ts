import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

import { albumDB, artistDB, favoritiesDB, trackDB } from 'src/db/mockedDB';
import { Track } from 'src/track/track.interfaces';
import { Album } from 'src/album/album.interface';
import { Artist } from 'src/artist/artist.interfaces';

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
      favoritiesDB.tracks.push(track);
      return true;
    }
    return false;
  }

  deleteFavoritesTrack(id: string): boolean {
    const trackData = [...favoritiesDB.tracks] as unknown as Track[];
    const trackInd = trackData.findIndex((track) => track.id === id);
    if (trackInd >= 0) {
      const trackIdInTrackDB = trackDB.findIndex((track) => track.id === id);
      favoritiesDB.tracks.splice(trackInd, 1);
      if (trackIdInTrackDB >= 0) {
        trackDB.splice(trackIdInTrackDB, 1);
      }
      return true;
    }
    return false;
  }

  addAlbum(id: string): boolean {
    const album = albumDB.find((albumId) => albumId.id === id);
    if (album) {
      favoritiesDB.albums.push(album);
      return true;
    }
    return false;
  }

  deleteFavoritesAlbum(id: string): boolean {
    const albumData = [...favoritiesDB.albums] as unknown as Album[];
    const albumInd = albumData.findIndex((album) => album.id === id);
    if (albumInd >= 0) {
      const albumIdInTrackDB = albumDB.findIndex((album) => album.id === id);
      favoritiesDB.albums.splice(albumInd, 1);
      if (albumIdInTrackDB >= 0) {
        albumDB.splice(albumIdInTrackDB, 1);
      }
      return true;
    }
    return false;
  }

  addArtist(id: string): boolean {
    const artist = artistDB.find((artistId) => artistId.id === id);
    if (artist) {
      favoritiesDB.artists.push(artist);
      return true;
    }
    return false;
  }

  deleteFavoritesArtist(id: string): boolean {
    const artistData = [...favoritiesDB.artists] as unknown as Artist[];
    const artistInd = artistData.findIndex((artist) => artist.id === id);
    if (artistInd >= 0) {
      const artistIdInTrackDB = artistDB.findIndex(
        (artist) => artist.id === id,
      );
      favoritiesDB.artists.splice(artistInd, 1);
      if (artistIdInTrackDB >= 0) {
        artistDB.splice(artistIdInTrackDB, 1);
      }
      return true;
    }
    return false;
  }
}
