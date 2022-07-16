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

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  private checkTypeofError(obj: any): obj is Error {
    return !!(<Error>obj);
  }

  @Get()
  getAllAlbums() {
    return this.albumService.getAllAlbum();
  }

  @Get('/:id')
  getAlbumById(@Param() { id }, @Res() response: Response) {
    const album = this.albumService.getAlbumById(id);
    if (this.checkTypeofError(album) && album?.code) {
      return response.status(album.code).send(album.message);
    } else {
      return response.send(album);
    }
  }

  @Post()
  createAlbum(@Body() albumData: AlbumCreator, @Res() response: Response) {
    const album = this.albumService.createAlbum(albumData);
    if (this.checkTypeofError(album) && album?.code) {
      return response.status(album.code).send(album.message);
    } else {
      return response.send(album);
    }
  }

  @Put('/:id')
  updateAlbum(
    @Param() { id },
    @Body() albumData: Album,
    @Res() response: Response,
  ) {
    const album = this.albumService.updateAlbum(id, albumData);
    if (this.checkTypeofError(album) && album?.code) {
      return response.status(album.code).send(album.message);
    } else {
      return response.send(album);
    }
  }

  @Delete('/:id')
  deleteAlbum(@Param() { id }, @Res() response: Response) {
    const album = this.albumService.deleteAlbum(id);
    if (this.checkTypeofError(album) && album?.code) {
      return response.status(album.code).send(album.message);
    } else {
      return response.send(album);
    }
  }
}
