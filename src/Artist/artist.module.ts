import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

import { v4 as uuidv4 } from 'uuid';
import { Artist, CreatorArtist } from './artist.interfaces';
import { artistDB, trackDB } from '../db/mockedDB';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {
  getAllArtists() {
    return artistDB;
  }

  getArtistById(id: string): Artist {
    return artistDB.find((artist) => artist.id === id);
  }

  addArtist(data: CreatorArtist): Artist {
    const artist = { ...data } as Artist;
    artist.id = uuidv4();
    artistDB.push(artist);
    return artist;
  }

  udpateArtist(id: string, data: CreatorArtist): Artist | null {
    const artist = artistDB.find((artist) => artist.id === id);
    if (artist) {
      const index = artistDB.findIndex((artist) => artist.id === id);
      const updatedData = {
        ...artist,
        ...data,
      };
      artistDB[index] = updatedData;
      return updatedData;
    }
    return null;
  }

  deleteArtist(id: string): boolean {
    const artistInd = artistDB.findIndex((artist) => artist.id === id);
    if (artistInd >= 0) {
      artistDB.splice(artistInd, 1);
      const trackInd = trackDB.findIndex((track) => track.artistId === id);
      if (trackInd >= 0) {
        trackDB[trackInd].artistId = null;
        trackDB[trackInd].albumId = null;
      }

      return true;
    }
    return false;
  }
}
