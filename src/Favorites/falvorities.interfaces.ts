import { Artist } from '../Artist/artist.interfaces';
import { Album } from '../Album/album.interface';
import { Track } from '../Track/track.interfaces';
export interface FavoritesI {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface FavoritesData {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
