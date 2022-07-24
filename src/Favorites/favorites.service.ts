import { Injectable } from '@nestjs/common';
import { validate, version } from 'uuid';
import { FavoritesModule } from './favorites.module';

import { Error, ErrorHandler } from 'src/errors/ErrorHandler';

@Injectable()
export class FavoritesService {
  private favoritesModule: FavoritesModule;

  constructor() {
    this.favoritesModule = new FavoritesModule();
  }

  private checkId(id: string): boolean {
    return validate(id) && version(id) === 4;
  }

  getAllFavorites() {
    return this.favoritesModule.getAllFavorities();
  }

  addtrack(id: string): boolean | Error {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const isAddedTrack = this.favoritesModule.addFavoritiesTrack(id);
    if (!isAddedTrack) {
      return new ErrorHandler({
        code: 422,
        message: "Track id doesn't exisit",
      });
    }
    return isAddedTrack;
  }

  deleteTrack(id: string): boolean | Error {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const isDeletedTrack = this.favoritesModule.deleteFavoritesTrack(id);

    if (!isDeletedTrack) {
      return new ErrorHandler({
        code: 404,
        message: 'Track not found',
      });
    }
    return isDeletedTrack;
  }

  addAlbum(id: string): boolean | Error {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const isAddedAlbum = this.favoritesModule.addAlbum(id);
    if (!isAddedAlbum) {
      return new ErrorHandler({
        code: 422,
        message: "Album id doesn't exisit",
      });
    }
    return isAddedAlbum;
  }

  deleteAlbum(id: string): boolean | Error {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const isDeletedAlbum = this.favoritesModule.deleteFavoritesAlbum(id);
    if (!isDeletedAlbum) {
      return new ErrorHandler({
        code: 404,
        message: 'Album not found',
      });
    }
    return isDeletedAlbum;
  }

  addArtist(id: string): boolean | Error {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const isAddedArtist = this.favoritesModule.addArtist(id);
    if (!isAddedArtist) {
      return new ErrorHandler({
        code: 422,
        message: "Artist id doesn't exisit",
      });
    }
    return isAddedArtist;
  }

  deleteArtist(id: string): boolean | Error {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const isDeletedArtist = this.favoritesModule.deleteFavoritesArtist(id);
    if (!isDeletedArtist) {
      return new ErrorHandler({
        code: 404,
        message: 'Artist not found',
      });
    }
    return isDeletedArtist;
  }
}
