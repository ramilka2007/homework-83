export interface RegisterMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
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

export interface Artist {
  _id: string;
  artist: string;
  information: string;
  image: string;
}

export interface Album {
  _id: string;
  artist: Artist;
  title: string;
  release: string;
  image: string;
}
