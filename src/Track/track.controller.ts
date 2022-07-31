import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { TrackService } from './track.service';

import { Response } from 'express';
import { Error } from 'src/errors/ErrorHandler';
import { Track } from './track.interfaces';
import { Observable } from 'rxjs';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  private checkTypeofError(obj: any): obj is Error {
    return !!(<Error>obj);
  }

  @Get()
  getAllTracks(): Observable<Track[]> {
    return this.trackService.getAllTracks();
  }

  @Get('/:id')
  async getTrackById(
    @Param() { id },
    @Res() response: Response,
  ): Promise<Track | Response> {
    const recivedTrackData = await this.trackService.getTrackById(id);
    if (this.checkTypeofError(recivedTrackData) && recivedTrackData?.code) {
      return response
        .status(recivedTrackData.code)
        .send(recivedTrackData.message);
    } else {
      return response.send(recivedTrackData);
    }
  }

  @Post()
  async createTrack(
    @Body() data: Track,
    @Res() response: Response,
  ): Promise<Track | Response> {
    const recivedTrackData = await this.trackService.createTrack(data);
    if (this.checkTypeofError(recivedTrackData) && recivedTrackData?.code) {
      return response
        .status(recivedTrackData.code)
        .send(recivedTrackData.message);
    } else {
      return response.status(201).send(recivedTrackData);
    }
  }

  @Put('/:id')
  async updateTrack(
    @Param() { id },
    @Body() data: Track,
    @Res() response: Response,
  ): Promise<Track | Response> {
    const recivedTrackData = await this.trackService.updateTrack(id, data);
    if (this.checkTypeofError(recivedTrackData) && recivedTrackData?.code) {
      return response
        .status(recivedTrackData.code)
        .send(recivedTrackData.message);
    } else {
      return response.send(recivedTrackData);
    }
  }

  @Delete('/:id')
  async deleteTrackById(
    @Param() { id },
    @Res() response: Response,
  ): Promise<Response> {
    const recivedTrackData = await this.trackService.deleteTrack(id);
    if (this.checkTypeofError(recivedTrackData) && recivedTrackData?.code) {
      return response
        .status(recivedTrackData.code)
        .send(recivedTrackData.message);
    } else {
      return response.status(204).send(recivedTrackData);
    }
  }
}
