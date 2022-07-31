import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { validate, version } from 'uuid';
import { Track, TrackCreator } from './track.interfaces';
import { TrackModule } from './track.module';

import { Error, ErrorHandler } from 'src/errors/ErrorHandler';
import { Observable } from 'rxjs';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => TrackModule)) private trackModule: TrackModule,
  ) {}

  private checkId(id: string): boolean {
    return validate(id) && version(id) === 4;
  }

  getAllTracks(): Observable<Track[]> {
    return this.trackModule.getAllTracks();
  }

  async getTrackById(id: string): Promise<Track | Error> {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const track = await this.trackModule.getTrackById(id);
    if (!track) {
      return new ErrorHandler({
        code: 404,
        message: 'Track not found',
      });
    }
    return track;
  }

  async createTrack(data: TrackCreator): Promise<Track | Error> {
    if (!Number(data?.duration) || !data?.name?.trim()) {
      return new ErrorHandler({
        code: 400,
        message: 'All fields are required',
      });
    }
    const track = await this.trackModule.createTrack(data);
    return track;
  }

  async updateTrack(id: string, trackData: Track): Promise<Track | Error> {
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
    const track = await this.trackModule.updateTrack(id, trackData);
    if (!track) {
      return new ErrorHandler({
        code: 404,
        message: 'Track not found',
      });
    }
    return track;
  }

  async deleteTrack(id: string): Promise<void | Error> {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const isTrackDeleted = await this.trackModule.deleteTrack(id);
    if (!isTrackDeleted) {
      return new ErrorHandler({
        code: 404,
        message: 'Track not found',
      });
    }
  }
}
