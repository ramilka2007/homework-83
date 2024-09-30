export interface RegisterMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  role: string;
  token: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface Artist {
  _id: string;
  user: User;
  name: string;
  information: string;
  image: string;
  isPublished: boolean;
}

export interface Album {
  _id: string;
  artist: Artist;
  user: User;
  title: string;
  release: string;
  image: string;
  isPublished: boolean;
}

export interface Track {
  _id: string;
  album: Album;
  user: User;
  title: string;
  duration: string;
  number: number;
  isPublished: boolean;
}

export interface TrackHistory {
  _id: string;
  user: User;
  datetime: string;
  track: Track;
}

export interface AlbumForm {
  artist: string;
  title: string;
  release: string;
  image: string | null;
}

export interface ArtistForm {
  name: string;
  information: string;
  image: string | null;
}

export interface TrackForm {
  artist: string;
  album: string;
  title: string;
  duration: string;
  number: number;
}
