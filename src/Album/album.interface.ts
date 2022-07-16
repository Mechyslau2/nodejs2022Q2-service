export interface AlbumCreator {
  name: string;
  year: number;
  artistId: string | null;
}

export interface Album extends AlbumCreator {
  id: string;
}
