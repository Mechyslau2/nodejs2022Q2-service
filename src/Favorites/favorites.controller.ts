import { Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

import { Error } from 'src/errors/ErrorHandler';
import { Response } from 'express';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  private checkTypeofError(obj: any): obj is Error {
    return !!(<Error>obj);
  }

  @Get()
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  addTrack(@Param() { id }, @Res() response: Response) {
    const track = this.favoritesService.addtrack(id);
    if (this.checkTypeofError(track) && track?.code) {
      return response.status(track.code).send(track.message);
    } else {
      return response.status(201).send(track);
    }
  }

  @Delete('track/:id')
  deleteTrack(@Param() { id }, @Res() response: Response) {
    const track = this.favoritesService.deleteTrack(id);
    if (this.checkTypeofError(track) && track?.code) {
      return response.status(track.code).send(track.message);
    } else {
      return response.status(204).send(track);
    }
  }

  @Post('album/:id')
  addAlbum(@Param() { id }, @Res() response: Response) {
    const album = this.favoritesService.addAlbum(id);
    if (this.checkTypeofError(album) && album?.code) {
      return response.status(album.code).send(album.message);
    } else {
      return response.status(201).send(album);
    }
  }

  @Delete('album/:id')
  deleteAlbum(@Param() { id }, @Res() response: Response) {
    const album = this.favoritesService.deleteAlbum(id);
    if (this.checkTypeofError(album) && album?.code) {
      return response.status(album.code).send(album.message);
    } else {
      return response.status(204).send(album);
    }
  }

  @Post('artist/:id')
  addArtist(@Param() { id }, @Res() response: Response) {
    const artist = this.favoritesService.addArtist(id);
    if (this.checkTypeofError(artist) && artist?.code) {
      return response.status(artist.code).send(artist.message);
    } else {
      return response.status(201).send(artist);
    }
  }

  @Delete('artist/:id')
  deleteArtist(@Param() { id }, @Res() response: Response) {
    const artist = this.favoritesService.deleteArtist(id);
    if (this.checkTypeofError(artist) && artist?.code) {
      return response.status(artist.code).send(artist.message);
    } else {
      return response.status(204).send(artist);
    }
  }
}
