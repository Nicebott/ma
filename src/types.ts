export interface Episode {
  number: number;
  title: string;
  videoUrl: string;
  thumbnail?: string;
  airDate?: string;
}

export interface Season {
  number: number;
  episodes: Episode[];
}

export interface MediaItem {
  id: number;
  title: string;
  originalTitle?: string;
  description: string;
  type: 'movie' | 'series';
  rating: number;
  featured: boolean;
  coverUrl: string;
  videoUrl: string;
  status?: string;
  lastAirDate?: string;
  genres?: string[];
  tmdbUrl?: string;
  seasons?: Season[];
}