import { Artist } from 'src/artist/artist.interfaces';
import { Album } from 'src/album/album.interface';
import { Track } from 'src/track/track.interfaces';
export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface FavoritesData {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
