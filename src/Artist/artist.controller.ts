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
import { ArtistService } from './artist.service';
import { Error } from '../errors/ErrorHandler';
import { Response } from 'express';
import { Artist, CreatorArtist } from './artist.interfaces';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  private checkTypeofError(obj: any): obj is Error {
    return !!(<Error>obj);
  }
  @Get()
  getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @Get('/:id')
  getArtistById(@Param() { id }, @Res() response: Response) {
    const artist = this.artistService.getArtistById(id);
    if (this.checkTypeofError(artist) && artist?.code) {
      return response.status(artist.code).send(artist.message);
    } else {
      return response.send(artist);
    }
  }

  @Post()
  createArtist(@Body() artistData: CreatorArtist, @Res() response: Response) {
    const artist = this.artistService.createArtist(artistData);
    if (this.checkTypeofError(artist) && artist?.code) {
      return response.status(artist.code).send(artist.message);
    } else {
      return response.send(artist);
    }
  }

  @Put('/:id')
  updateArtist(
    @Param() { id },
    @Body() artistData: Artist,
    @Res() response: Response,
  ) {
    const artist = this.artistService.updateArtist(id, artistData);
    if (this.checkTypeofError(artist) && artist?.code) {
      return response.status(artist.code).send(artist.message);
    } else {
      return response.send(artist);
    }
  }

  @Delete('/:id')
  deleteArtist(@Param() { id }, @Res() response: Response) {
    const artist = this.artistService.deleteArtist(id);
    if (this.checkTypeofError(artist) && artist?.code) {
      return response.status(artist.code).send(artist.message);
    } else {
      return response.status(204).send(artist);
    }
  }
}
