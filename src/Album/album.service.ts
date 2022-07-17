import { Injectable } from '@nestjs/common';
import { Error, ErrorHandler } from 'src/errors/ErrorHandler';
import { validate, version } from 'uuid';
import { Album, AlbumCreator } from './album.interface';
import { AlbumModule } from './album.module';

@Injectable()
export class AlbumService {
  private albumModule: AlbumModule;
  constructor() {
    this.albumModule = new AlbumModule();
  }

  private checkId(id: string): boolean {
    return validate(id) && version(id) === 4;
  }

  getAllAlbum() {
    return this.albumModule.getAllAlbums();
  }

  getAlbumById(id: string): Album | Error {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const album = this.albumModule.getAlbumById(id);
    if (!album) {
      return new ErrorHandler({
        code: 404,
        message: 'Album not found',
      });
    }
    return album;
  }

  updateAlbum(id: string, albumData: Album): Album | Error {
    if (
      typeof albumData?.name !== 'string' ||
      !albumData?.name?.trim() ||
      !Number(albumData?.year)
    ) {
      return new ErrorHandler({
        code: 400,
        message: 'All fields are required',
      });
    }
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "It isn't valid id",
      });
    }
    const album = this.albumModule.updateAlbum(id, albumData);
    if (!album) {
      return new ErrorHandler({
        code: 404,
        message: 'Album not found',
      });
    }
    return album;
  }

  createAlbum(data: AlbumCreator): Album | Error {
    if (!data?.name?.trim() || !Number(data?.year)) {
      return new ErrorHandler({
        code: 400,
        message: 'All fields are required',
      });
    }
    const album = this.albumModule.addAlbum(data);
    return album;
  }

  deleteAlbum(id: string) {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const data = this.albumModule.deleteAlbum(id);
    if (!data) {
      return new ErrorHandler({
        code: 404,
        message: 'Album not found',
      });
    }
  }
}
