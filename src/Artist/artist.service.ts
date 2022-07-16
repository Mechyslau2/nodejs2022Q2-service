import { Injectable } from '@nestjs/common';
import { ErrorHandler, Error } from 'src/errors/ErrorHandler';
import { validate, version } from 'uuid';
import { Artist, CreatorArtist } from './artist.interfaces';
import { ArtistModule } from './artist.module';

@Injectable()
export class ArtistService {
  private artistModule: ArtistModule;

  constructor() {
    this.artistModule = new ArtistModule();
  }

  private checkId(id: string): boolean {
    return validate(id) && version(id) === 4;
  }

  getAllArtists() {
    return this.artistModule.getAllArtists();
  }

  getArtistById(id: string): Artist | Error {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "It isn't valid id",
      });
    }
    const artist = this.artistModule.getArtistById(id);
    if (!artist) {
      return new ErrorHandler({
        code: 404,
        message: 'Artist not found',
      });
    }
    return artist;
  }

  createArtist(data: CreatorArtist): Artist | Error {
    if (!data?.grammy || !data?.name?.trim()) {
      return new ErrorHandler({
        code: 400,
        message: 'All fields are required',
      });
    }
    const artist = this.artistModule.addArtist(data);
    return artist;
  }

  updateArtist(id: string, data: Artist): Artist | Error {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "It isn't valid id",
      });
    }
    const artist = this.artistModule.udpateArtist(id, data);
    if (!artist) {
      return new ErrorHandler({
        code: 404,
        message: 'Artist not found',
      });
    }
    return artist;
  }

  deleteArtist(id: string) {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const data = this.artistModule.deleteArtist(id);
    if (!data) {
      return new ErrorHandler({
        code: 404,
        message: 'Artist not found',
      });
    }
  }
}
