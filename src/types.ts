export interface Episode {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  airDate: string;
}

export interface Movie {
  id: number;
  title: string;
  type: 'movie' | 'series';
  rating: number;
  image: string;
  category: string;
  description: string;
  featured?: boolean;
  episodes?: Record<number, Episode[]>;
}