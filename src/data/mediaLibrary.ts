import { MediaItem } from '../types';

export const mediaLibrary: MediaItem[] = [
  {
    id: 1,
    title: "LEGO Ninjago",
    originalTitle: "The LEGO Ninjago Movie",
    description: "Un joven maestro constructor y ninja secreto se enfrenta al malvado señor de la guerra Garmadon, quien también resulta ser su padre. Con la ayuda de sus amigos, que también son ninjas secretos, deben derrotar a Garmadon y salvar su ciudad.",
    type: "series",
    rating: 8.5,
    featured: true,
    coverUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/vUo0pNXGhp2ffTJxiStWt6fHL7F.jpg",
    videoUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/vUo0pNXGhp2ffTJxiStWt6fHL7F.jpg",
    status: "Estrenada",
    genres: ["Animación", "Acción", "Aventura", "Comedia", "Familiar"],
    tmdbUrl: "https://www.themoviedb.org/movie/274862-the-lego-ninjago-movie"
    seasons: [
      {
        number: 1,
        episodes: [
          {
            number: 1,
            title: "Piloto",
            videoUrl: "https://filemoon.sx/e/l63p1aw5kf4h",
            thumbnail: "https://image.tmdb.org/t/p/w500/vlv1gn98GqMnKHLSh0dNciqGfBl.jpg",
            airDate: "2021-02-23"
          },
          {
            number: 2,
            title: "Heritage",
            videoUrl: "Próximamente",
            thumbnail: "https://image.tmdb.org/t/p/w500/vlv1gn98GqMnKHLSh0dNciqGfBl.jpg",
            airDate: "2021-03-02"
          }
        ]
      },
  },
  {
    id: 2,
    title: "Superman & Lois",
    originalTitle: "Superman & Lois",
    description: "Clark Kent y Lois Lane regresan a Smallville con sus hijos Jonathan y Jordan, donde se encuentran con nuevos desafíos tanto como padres como superhéroes.",
    type: "series",
    rating: 8.061,
    featured: false,
    coverUrl: "https://image.tmdb.org/t/p/original/vlv1gn98GqMnKHLSh0dNciqGfBl.jpg",
    videoUrl: "https://filemoon.sx/e/l63p1aw5kf4h",
    status: "En emisión",
    lastAirDate: "2024-10-21",
    genres: ["Drama", "Sci-Fi & Fantasy"],
    tmdbUrl: "https://www.themoviedb.org/tv/95057-superman-lois",
    seasons: [
      {
        number: 1,
        episodes: [
          {
            number: 1,
            title: "Piloto",
            videoUrl: "https://filemoon.sx/e/l63p1aw5kf4h",
            thumbnail: "https://image.tmdb.org/t/p/w500/vlv1gn98GqMnKHLSh0dNciqGfBl.jpg",
            airDate: "2021-02-23"
          },
          {
            number: 2,
            title: "Heritage",
            videoUrl: "Próximamente",
            thumbnail: "https://image.tmdb.org/t/p/w500/vlv1gn98GqMnKHLSh0dNciqGfBl.jpg",
            airDate: "2021-03-02"
          }
        ]
      },
      {
        number: 2,
        episodes: [
          {
            number: 1,
            title: "What Lies Beneath",
            videoUrl: "Próximamente",
            thumbnail: "https://image.tmdb.org/t/p/w500/vlv1gn98GqMnKHLSh0dNciqGfBl.jpg",
            airDate: "2022-01-11"
          },
          {
            number: 2,
            title: "The Ties That Bind",
            videoUrl: "Próximamente",
            thumbnail: "https://image.tmdb.org/t/p/w500/vlv1gn98GqMnKHLSh0dNciqGfBl.jpg",
            airDate: "2022-01-18"
          }
        ]
      },
      {
        number: 3,
        episodes: [
          {
            number: 1,
            title: "Closer",
            videoUrl: "Próximamente",
            thumbnail: "https://image.tmdb.org/t/p/w500/vlv1gn98GqMnKHLSh0dNciqGfBl.jpg",
            airDate: "2023-03-14"
          },
          {
            number: 2,
            title: "Uncontrollable Forces",
            videoUrl: "Próximamente",
            thumbnail: "https://image.tmdb.org/t/p/w500/vlv1gn98GqMnKHLSh0dNciqGfBl.jpg",
            airDate: "2023-03-21"
          }
        ]
      },
      {
        number: 4,
        episodes: [
          {
            number: 1,
            title: "El Regreso",
            videoUrl: "Próximamente",
            thumbnail: "https://image.tmdb.org/t/p/w500/vlv1gn98GqMnKHLSh0dNciqGfBl.jpg",
            airDate: "2024-03-14"
          },
          {
            number: 2,
            title: "Verdades Ocultas",
            videoUrl: "Próximamente",
            thumbnail: "https://image.tmdb.org/t/p/w500/vlv1gn98GqMnKHLSh0dNciqGfBl.jpg",
            airDate: "2024-03-21"
          },
          {
            number: 3,
            title: "Decisiones",
            videoUrl: "Próximamente",
            thumbnail: "https://image.tmdb.org/t/p/w500/vlv1gn98GqMnKHLSh0dNciqGfBl.jpg",
            airDate: "2024-03-28"
          }
        ]
      }
    ]
  }
];
