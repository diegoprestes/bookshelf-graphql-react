export interface Book {
  id: string;
  name: string;
  genres: Genre[];
  pages: number;
  cover: string;
  year: number;
  author: Author;
}

export interface Author {
  id: string;
  name: string;
  country: string;
  image: string;
  birthDate: string;
  deathDate: string;
  books: Book[];
}

export interface Genre {
  id: string;
  name: string;
}