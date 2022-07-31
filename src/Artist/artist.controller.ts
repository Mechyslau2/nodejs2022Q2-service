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
import { Observable } from 'rxjs';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  private checkTypeofError(obj: any): obj is Error {
    return !!(<Error>obj);
  }
  @Get()
  getAllArtists(): Observable<Artist[]> {
    return this.artistService.getAllArtists();
  }

  @Get('/:id')
  async getArtistById(
    @Param() { id },
    @Res() response: Response,
  ): Promise<Artist | Response> {
    const artist = await this.artistService.getArtistById(id);
    if (this.checkTypeofError(artist) && artist?.code) {
      return response.status(artist.code).send(artist.message);
    } else {
      return response.send(artist);
    }
  }

  @Post()
  async createArtist(
    @Body() artistData: CreatorArtist,
    @Res() response: Response,
  ): Promise<Artist | Response> {
    const artist = await this.artistService.createArtist(artistData);
    if (this.checkTypeofError(artist) && artist?.code) {
      return response.status(artist.code).send(artist.message);
    } else {
      return response.status(201).send(artist);
    }
  }

  @Put('/:id')
  async updateArtist(
    @Param() { id },
    @Body() artistData: Artist,
    @Res() response: Response,
  ): Promise<Artist | Response> {
    const artist = await this.artistService.updateArtist(id, artistData);
    if (this.checkTypeofError(artist) && artist?.code) {
      return response.status(artist.code).send(artist.message);
    } else {
      return response.send(artist);
    }
  }

  @Delete('/:id')
  async deleteArtist(
    @Param() { id },
    @Res() response: Response,
  ): Promise<void | Response> {
    const artist = await this.artistService.deleteArtist(id);
    if (this.checkTypeofError(artist) && artist?.code) {
      return response.status(artist.code).send(artist.message);
    } else {
      return response.status(204).send(artist);
    }
  }
}
