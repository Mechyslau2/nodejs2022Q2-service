import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { v4 as uuidv4 } from 'uuid';

import { albumDB, artistDB } from 'src/db/mockedDB';
import { Album, AlbumCreator } from './album.interface';

@Module({
  providers: [AlbumService],
})
export class AlbumModule {
  getAllAlbums() {
    return albumDB;
  }

  getAlbumById(id: string): Album {
    const album = albumDB.find((album) => album.id === id);
    return album;
  }

  addAlbum(data: AlbumCreator): Album {
    const albumData = { ...data } as Album;
    albumData.id = uuidv4();
    albumDB.push(albumData);
    return albumData;
  }

  updateAlbum(id: string, data: Album): Album {
    const album = albumDB.find((album) => album.id === id);
    const index = albumDB.findIndex((album) => album.id === id);
    const updatedData = {
      ...album,
      ...data,
    };
    albumDB[index] = updatedData;
    return updatedData;
  }

  deleteAlbum(id: string): boolean {
    const albumInd = albumDB.findIndex((album) => album.id === id);
    if (albumInd >= 0) {
      const { id: artistId } = albumDB[albumInd];
      const artistInd = artistDB.findIndex((artist) => artist.id === artistId);
      albumDB.splice(albumInd, 1);
      artistDB.slice(artistInd, 1);
      return true;
    }
    return false;
  }
}
