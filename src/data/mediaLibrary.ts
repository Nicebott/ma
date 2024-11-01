import { MediaItem } from '../types';

export const mediaLibrary: MediaItem[] = [
  {
    id: 1,
    title: "LEGO Ninjago",
    originalTitle: "Ninjago",
    description: "Los guerreros están dispuestos a ir a las profundidades del inframundo para recuperar las armas legendarias del oro de Ninjago.",
    type: "series",
    rating: 8.5,
    featured: true,
    coverUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/beKgqwruOGmVAvRwRvfuOcXwl2Z.jpg",
    videoUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/beKgqwruOGmVAvRwRvfuOcXwl2Z.jpg",
    status: "Estrenada",
    genres: ["Animación", "Acción", "Aventura", "Comedia", "Familiar"],
    tmdbUrl: "https://www.themoviedb.org/tv/38693-ninjago-masters-of-spinjitzu",
    seasons: [
      {
        number: 1,
        episodes: [
          {
            number: 1,
            title: "Piloto",
            videoUrl: "",
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
  },
  {
    id: 2,
    title: "Canario Negro",
    originalTitle: "Canario Negro",
    description: "La agente de alto rango de la CIA Avery Graves es chantajeada por terroristas para que traicione a su propio país y salve a su marido secuestrado. Separada de su equipo, recurre a sus contactos del hampa para sobrevivir y ayudar a localizar la codiciada información que quieren los secuestradores.",
    type: "movie",
    rating: 8.061,
    featured: false,
    coverUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8iD8O4ZFhVHpT7RUmHJeyGEtZpX.jpg",
    videoUrl: "https://filemoon.sx/e/9n6oq6t61qrg",
    status: "Estrenado",
    lastAirDate: "2024-10-21",
    genres: ["Drama", "Sci-Fi & Fantasy"],
    tmdbUrl: "https://www.themoviedb.org/movie/976734-canary-black"
  }
];
