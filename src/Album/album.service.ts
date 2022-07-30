import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Error, ErrorHandler } from 'src/errors/ErrorHandler';
import { validate, version } from 'uuid';
import { Album, AlbumCreator } from './album.interface';
import { AlbumModule } from './album.module';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => AlbumModule)) private albumModule: AlbumModule,
  ) {}

  private checkId(id: string): boolean {
    return validate(id) && version(id) === 4;
  }

  getAllAlbum(): Observable<Album[]> {
    return this.albumModule.getAllAlbums();
  }

  async getAlbumById(id: string): Promise<Album | Error> {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const album = await this.albumModule.getAlbumById(id);
    if (!album) {
      return new ErrorHandler({
        code: 404,
        message: 'Album not found',
      });
    }
    return album;
  }

  async updateAlbum(id: string, albumData: Album): Promise<Album | Error> {
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
    const album = await this.albumModule.updateAlbum(id, albumData);
    if (!album) {
      return new ErrorHandler({
        code: 404,
        message: 'Album not found',
      });
    }
    return album;
  }

  async createAlbum(data: AlbumCreator): Promise<Album | Error> {
    if (!data?.name?.trim() || !Number(data?.year)) {
      return new ErrorHandler({
        code: 400,
        message: 'All fields are required',
      });
    }
    const album = await this.albumModule.addAlbum(data);
    return album;
  }

  async deleteAlbum(id: string): Promise<Error | void> {
    if (!this.checkId(id)) {
      return new ErrorHandler({
        code: 400,
        message: "it ins't valid id",
      });
    }
    const isAlbumDeleted = await this.albumModule.deleteAlbum(id);
    if (!isAlbumDeleted) {
      return new ErrorHandler({
        code: 404,
        message: 'Album not found',
      });
    }
  }
}
