export interface RedGif {
  id: string;
  url: string;
  viewCount: number;
  tags: string[];
  creator: {
    id: string;
    username: string;
    name?: string;
  };
  urls: {
    hd: string;
    sd: string;
    thumbnail: string;
    poster: string;
    silent: string;
  };
  width: number;
  height: number;
  thumbnail: string;
  createdAt: string;
}

export interface RedGifResponse {
  gifs: any[]; // Using any temporarily to avoid conflicts during transition
  page: number;
  total: number;
  count: number;
}

export interface RedGifCreator {
  id: string;
  username: string;
  name?: string;
  avatar: string;
  gifCount: number;
}

export interface RedGifCreatorResponse {
  creators: RedGifCreator[];
}

export interface RedGifAuthResponse {
  token: string;
}
