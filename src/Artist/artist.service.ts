import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ErrorHandler, Error } from 'src/errors/ErrorHandler';
import { validate, version } from 'uuid';
import { Artist, CreatorArtist } from './artist.interfaces';
import { ArtistModule } from './artist.module';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => ArtistModule)) private artistModule: ArtistModule,
  ) {}

  private checkId(id: string): boolean {
    return validate(id) && version(id) === 4;
  }

  getAllArtists(): Observable<Artist[]> {
    return this.artistModule.getAllArtists();
  }

  async getArtistById(id: string): Promise<Artist | Error> {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "It isn't valid id",
      });
    }
    const artist = await this.artistModule.getArtistById(id);
    if (!artist) {
      return new ErrorHandler({
        code: 404,
        message: 'Artist not found',
      });
    }
    return artist;
  }

  async createArtist(data: CreatorArtist): Promise<Artist | Error> {
    if (
      !data.hasOwnProperty('grammy') ||
      typeof data?.grammy !== 'boolean' ||
      !data?.name?.trim()
    ) {
      return new ErrorHandler({
        code: 400,
        message: 'All fields are required',
      });
    }
    return await this.artistModule.addArtist(data);
  }

  async updateArtist(id: string, data: CreatorArtist): Promise<Artist | Error> {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "It isn't valid id",
      });
    }
    if (
      !data.hasOwnProperty('grammy') ||
      typeof data?.grammy !== 'boolean' ||
      typeof data.name !== 'string' ||
      !data?.name?.trim()
    ) {
      return new ErrorHandler({
        code: 400,
        message: 'All fields are required',
      });
    }
    const artist = await this.artistModule.udpateArtist(id, data);
    if (!artist) {
      return new ErrorHandler({
        code: 404,
        message: 'Artist not found',
      });
    }
    return artist;
  }

  async deleteArtist(id: string): Promise<void | Error> {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const isArtistDeleted = await this.artistModule.deleteArtist(id);
    if (!isArtistDeleted) {
      return new ErrorHandler({
        code: 404,
        message: 'Artist not found',
      });
    }
  }
}
