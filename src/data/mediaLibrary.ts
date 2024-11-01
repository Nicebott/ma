import { MediaItem } from '../types';

export const mediaLibrary: MediaItem[] = [
  {
    id: 1,
    title: "Superman & Lois",
    originalTitle: "Superman & Lois",
    description: "Clark Kent y Lois Lane regresan a Smallville con sus hijos Jonathan y Jordan, donde se encuentran con nuevos desafíos tanto como padres como superhéroes.",
    type: "series",
    rating: 8.061,
    featured: true,
    coverUrl: "/media/covers/prueba.jpg",
    videoUrl: "/media/video.mp4",
    status: "En emisión",
    lastAirDate: "2024-10-21",
    genres: ["Drama", "Sci-Fi & Fantasy"],
    tmdbUrl: "https://www.themoviedb.org/tv/95057-superman-lois",
    seasons: [
      {
        number: 4,
        episodes: [
          {
            number: 1,
            title: "El Regreso",
            videoUrl: "/media/series/superman-and-lois/s04e01.mp4",
            thumbnail: "/media/series/superman-and-lois/thumbnails/s04e01.jpg"
          },
          {
            number: 2,
            title: "Verdades Ocultas",
            videoUrl: "/media/series/superman-and-lois/s04e02.mp4",
            thumbnail: "/media/series/superman-and-lois/thumbnails/s04e02.jpg"
          },
          {
            number: 3,
            title: "Decisiones",
            videoUrl: "/media/series/superman-and-lois/s04e03.mp4",
            thumbnail: "/media/series/superman-and-lois/thumbnails/s04e03.jpg"
          }
        ]
      }
    ]
  }
];