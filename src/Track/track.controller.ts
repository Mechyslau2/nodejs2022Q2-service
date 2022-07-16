import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { TrackService } from './track.service';

import { response, Response } from 'express';
import { Error } from 'src/errors/ErrorHandler';
import { Track } from './track.interfaces';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  private checkTypeofError(obj: any): obj is Error {
    return !!(<Error>obj);
  }

  @Get()
  getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @Get('/:id')
  getTrackById(@Param() { id }, @Res() response: Response) {
    const recivedTrackData = this.trackService.getTrackById(id);
    if (this.checkTypeofError(recivedTrackData) && recivedTrackData?.code) {
      return response
        .status(recivedTrackData.code)
        .send(recivedTrackData.message);
    } else {
      return response.send(recivedTrackData);
    }
  }

  @Post()
  createTrack(@Body() data: Track, @Res() response: Response) {
    const recivedTrackData = this.trackService.createTrack(data);
    if (this.checkTypeofError(recivedTrackData) && recivedTrackData?.code) {
      return response
        .status(recivedTrackData.code)
        .send(recivedTrackData.message);
    } else {
      return response.send(recivedTrackData);
    }
  }

  @Put('/:id')
  updateTrack(@Param() { id }, @Body() data: Track, @Res() response: Response) {
    const recivedTrackData = this.trackService.updateTrack(id, data);
    if (this.checkTypeofError(recivedTrackData) && recivedTrackData?.code) {
      return response
        .status(recivedTrackData.code)
        .send(recivedTrackData.message);
    } else {
      return response.send(recivedTrackData);
    }
  }

  @Delete('/:id')
  deleteTrackById(@Param() { id }, @Res() response: Response) {
    const recivedTrackData = this.trackService.deleteTrack(id);
    if (this.checkTypeofError(recivedTrackData) && recivedTrackData?.code) {
      return response
        .status(recivedTrackData.code)
        .send(recivedTrackData.message);
    } else {
      return response.send(recivedTrackData);
    }
  }
}
