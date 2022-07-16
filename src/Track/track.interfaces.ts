export interface TrackCreator {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface Track extends TrackCreator {
  id: string;
}
