import { Module } from '@nestjs/common';
import { albumDB, artistDB, trackDB } from 'src/db/mockedDB';
import { TrackController } from './track.controller';
import { Track, TrackCreator } from './track.interfaces';
import { v4 as uuidv4 } from 'uuid';

import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {
  getAllTracks() {
    return trackDB;
  }

  getTrackById(id: string): Track {
    const track = trackDB.find((track) => track.id === id);
    return track;
  }

  createTrack(data: TrackCreator): Track {
    const track = { ...data } as Track;
    track.id = uuidv4();
    return track;
  }

  updateTrack(id: string, trackData: Track): Track {
    const data = trackDB.find((track) => track.id === id);
    const index = trackDB.findIndex((track) => track.id === id);
    const updatedData = {
      ...data,
      ...trackData,
    };
    trackDB[index] = updatedData;
    return updatedData;
  }

  deleteTrack(id: string): boolean {
    const trackInd = trackDB.findIndex((track) => track.id === id);
    if (trackInd >= 0) {
      const { artistId, albumId } = trackDB[trackInd];
      const artistInd = artistDB.findIndex((artist) => artist.id === artistId);
      const albumInd = albumDB.findIndex((album) => album.id === albumId);
      trackDB.splice(trackInd, 1);
      artistDB.slice(artistInd, 1);
      albumDB.splice(albumInd, 1);
      return true;
    }
    return false;
  }
}
