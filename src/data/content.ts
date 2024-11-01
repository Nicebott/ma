export const initialContent = [
  {
    id: 1,
    title: "Breaking Bad",
    type: "series",
    rating: 4.9,
    image: "temporada-13.jpg",
    category: "popular",
    description: "Un profesor de química se convierte en un criminal tras ser diagnosticado con cáncer.",
    featured: true,
    episodes: {
      1: [
        {
          id: 1,
          title: "Piloto",
          description: "Un profesor de química recurre a una vida de crimen.",
          thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=300&h=200",
          duration: "58 min",
          airDate: "20 Ene 2008"
        },
        {
          id: 2,
          title: "El Gato está en la Bolsa",
          description: "Walt y Jesse intentan deshacerse de dos cadáveres.",
          thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=300&h=200",
          duration: "48 min",
          airDate: "27 Ene 2008"
        },
        {
          id: 3,
          title: "Y la Bolsa en el Río",
          description: "Walt y Jesse enfrentan las consecuencias de sus acciones.",
          thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=300&h=200",
          duration: "48 min",
          airDate: "10 Feb 2008"
        }
      ]
    }
  },
  {
    id: 2,
    title: "Stranger Things",
    type: "series",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=1200&h=600",
    category: "popular",
    description: "Un grupo de niños se enfrenta a fuerzas sobrenaturales en los años 80.",
    featured: true
  },
  {
    id: 3,
    title: "El Padrino",
    type: "movie",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=1200&h=600",
    category: "classics",
    description: "La historia de una familia de la mafia italiana en Nueva York.",
    featured: true
  }
];