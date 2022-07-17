import { Injectable } from '@nestjs/common';
import { validate, version } from 'uuid';
import { Track, TrackCreator } from './track.interfaces';
import { TrackModule } from './track.module';

import { Error, ErrorHandler } from 'src/errors/ErrorHandler';

@Injectable()
export class TrackService {
  private trackModule: TrackModule;

  constructor() {
    this.trackModule = new TrackModule();
  }

  private checkId(id: string): boolean {
    return validate(id) && version(id) === 4;
  }

  getAllTracks() {
    return this.trackModule.getAllTracks();
  }

  getTrackById(id: string): Track | Error {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const track = this.trackModule.getTrackById(id);
    if (!track) {
      return new ErrorHandler({
        code: 404,
        message: 'Track not found',
      });
    }
    return track;
  }

  createTrack(data: TrackCreator): Track | Error {
    if (!Number(data?.duration) || !data?.name?.trim()) {
      return new ErrorHandler({
        code: 400,
        message: 'All fields are required',
      });
    }
    const track = this.trackModule.createTrack(data);
    return track;
  }

  updateTrack(id: string, trackData: Track): Track | Error {
    if (
      typeof trackData?.name !== 'string' ||
      !trackData?.name?.trim() ||
      typeof trackData?.duration !== 'number'
    ) {
      return new ErrorHandler({
        code: 400,
        message: 'All fields are required',
      });
    }
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "It isn't valid id",
      });
    }
    const track = this.trackModule.updateTrack(id, trackData);
    if (!track) {
      return new ErrorHandler({
        code: 404,
        message: 'Track not found',
      });
    }
    return track;
  }

  deleteTrack(id: string) {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const data = this.trackModule.deleteTrack(id);
    if (!data) {
      return new ErrorHandler({
        code: 404,
        message: 'Track not found',
      });
    }
  }
}
