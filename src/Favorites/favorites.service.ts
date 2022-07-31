import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { validate, version } from 'uuid';
import { FavoritesModule } from './favorites.module';

import { Error, ErrorHandler } from 'src/errors/ErrorHandler';
import { FavoritesData, FavoritesI } from './falvorities.interfaces';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => FavoritesModule))
    private favoritesModule: FavoritesModule,
  ) {}

  private checkId(id: string): boolean {
    return validate(id) && version(id) === 4;
  }

  async getAllFavorites(): Promise<FavoritesI> {
    return await this.favoritesModule.getAllFavorities();
  }

  async addtrack(id: string): Promise<boolean | Error> {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const isAddedTrack = await this.favoritesModule.addFavoritiesTrack(id);
    if (!isAddedTrack) {
      return new ErrorHandler({
        code: 422,
        message: "Track id doesn't exisit",
      });
    }
    return isAddedTrack;
  }

  async deleteTrack(id: string): Promise<boolean | Error> {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const isDeletedTrack = await this.favoritesModule.deleteFavoritesTrack(id);

    if (!isDeletedTrack) {
      return new ErrorHandler({
        code: 404,
        message: 'Track not found',
      });
    }
    return isDeletedTrack;
  }

  async addAlbum(id: string): Promise<boolean | Error> {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const isAddedAlbum = await this.favoritesModule.addAlbum(id);
    if (!isAddedAlbum) {
      return new ErrorHandler({
        code: 422,
        message: "Album id doesn't exisit",
      });
    }
    return isAddedAlbum;
  }

  async deleteAlbum(id: string): Promise<boolean | Error> {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const isDeletedAlbum = await this.favoritesModule.deleteFavoritesAlbum(id);
    if (!isDeletedAlbum) {
      return new ErrorHandler({
        code: 404,
        message: 'Album not found',
      });
    }
    return isDeletedAlbum;
  }

  async addArtist(id: string): Promise<boolean | Error> {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const isAddedArtist = await this.favoritesModule.addArtist(id);
    if (!isAddedArtist) {
      return new ErrorHandler({
        code: 422,
        message: "Artist id doesn't exisit",
      });
    }
    return isAddedArtist;
  }

  async deleteArtist(id: string): Promise<boolean | Error> {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const isDeletedArtist = await this.favoritesModule.deleteFavoritesArtist(id);
    if (!isDeletedArtist) {
      return new ErrorHandler({
        code: 404,
        message: 'Artist not found',
      });
    }
    return isDeletedArtist;
  }
}
