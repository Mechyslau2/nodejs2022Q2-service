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
import { AlbumService } from './album.service';

import { Error } from 'src/errors/ErrorHandler';
import { Response } from 'express';
import { Album, AlbumCreator } from './album.interface';
import { Observable } from 'rxjs';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  private checkTypeofError(obj: any): obj is Error {
    return !!(<Error>obj);
  }

  @Get()
  getAllAlbums(): Observable<Album[]> {
    return this.albumService.getAllAlbum();
  }

  @Get('/:id')
  async getAlbumById(
    @Param() { id },
    @Res() response: Response,
  ): Promise<Album | Response> {
    const album = await this.albumService.getAlbumById(id);
    if (this.checkTypeofError(album) && album?.code) {
      return response.status(album.code).send(album.message);
    } else {
      return response.send(album);
    }
  }

  @Post()
  async createAlbum(
    @Body() albumData: AlbumCreator,
    @Res() response: Response,
  ): Promise<Album | Response> {
    const album = await this.albumService.createAlbum(albumData);
    if (this.checkTypeofError(album) && album?.code) {
      return response.status(album.code).send(album.message);
    } else {
      return response.status(201).send(album);
    }
  }

  @Put('/:id')
  async updateAlbum(
    @Param() { id },
    @Body() albumData: Album,
    @Res() response: Response,
  ): Promise<Album | Response> {
    const album = await this.albumService.updateAlbum(id, albumData);
    if (this.checkTypeofError(album) && album?.code) {
      return response.status(album.code).send(album.message);
    } else {
      return response.send(album);
    }
  }

  @Delete('/:id')
  async deleteAlbum(
    @Param() { id },
    @Res() response: Response,
  ): Promise<void | Response> {
    const album = await this.albumService.deleteAlbum(id);
    if (this.checkTypeofError(album) && album?.code) {
      return response.status(album.code).send(album.message);
    } else {
      return response.status(204).send(album);
    }
  }
}
