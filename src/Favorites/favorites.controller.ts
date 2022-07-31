import { Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

import { Error } from 'src/errors/ErrorHandler';
import { Response } from 'express';
import { FavoritesData } from './falvorities.interfaces';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  private checkTypeofError(obj: any): obj is Error {
    return !!(<Error>obj);
  }

  @Get()
  async getAllFavorites(): Promise<any> {
    return await this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  async addTrack(
    @Param() { id },
    @Res() response: Response,
  ): Promise<Response> {
    const track = await this.favoritesService.addtrack(id);
    if (this.checkTypeofError(track) && track?.code) {
      return response.status(track.code).send(track.message);
    } else {
      return response.status(201).send(track);
    }
  }

  @Delete('track/:id')
  async deleteTrack(
    @Param() { id },
    @Res() response: Response,
  ): Promise<Response> {
    const track = await this.favoritesService.deleteTrack(id);
    if (this.checkTypeofError(track) && track?.code) {
      return response.status(track.code).send(track.message);
    } else {
      return response.status(204).send(track);
    }
  }

  @Post('album/:id')
  async addAlbum(
    @Param() { id },
    @Res() response: Response,
  ): Promise<Response> {
    const album = await this.favoritesService.addAlbum(id);
    if (this.checkTypeofError(album) && album?.code) {
      return response.status(album.code).send(album.message);
    } else {
      return response.status(201).send(album);
    }
  }

  @Delete('album/:id')
  async deleteAlbum(
    @Param() { id },
    @Res() response: Response,
  ): Promise<Response> {
    const album = await this.favoritesService.deleteAlbum(id);
    if (this.checkTypeofError(album) && album?.code) {
      return response.status(album.code).send(album.message);
    } else {
      return response.status(204).send(album);
    }
  }

  @Post('artist/:id')
  async addArtist(
    @Param() { id },
    @Res() response: Response,
  ): Promise<Response> {
    const artist = await this.favoritesService.addArtist(id);
    if (this.checkTypeofError(artist) && artist?.code) {
      return response.status(artist.code).send(artist.message);
    } else {
      return response.status(201).send(artist);
    }
  }

  @Delete('artist/:id')
  async deleteArtist(
    @Param() { id },
    @Res() response: Response,
  ): Promise<Response> {
    const artist = await this.favoritesService.deleteArtist(id);
    if (this.checkTypeofError(artist) && artist?.code) {
      return response.status(artist.code).send(artist.message);
    } else {
      return response.status(204).send(artist);
    }
  }
}
