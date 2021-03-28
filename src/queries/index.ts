import { gql } from '@apollo/client';

export const getAuthorsQuery = gql`
  query RootQueryType {
    authors{
      id
      name
    }
  }
`;

export const getBooksQuery = gql`
  query RootQueryType {
    books{
      id
      name
      cover
      author {
        name
      }
    }
  }
`;

export const getGenresQuery = gql`
query RootQueryType {
  genres{
    id
    name
  }
}
`;

export const getBookQuery = gql`
  query RootQueryType($id: ID!) {
    book(id: $id) {
      id
      name
      genres {
        name
      }
      pages
      cover
      year
      author{
        id
        name
        country
        image
        birthDate
        deathDate
        books {
          id
          name
        }
      }
    }
  }
`;

export const addAuthorMutation = gql`
  mutation Mutation($name: String!, $age: Number!) {
    addAuthor(name: $name, age: $age) {
      id
      name
    }
  }
`;

export const addBookMutation = gql`
  mutation Mutation($name: String!, $genres: [ID]!, $pages: Int!, $authorId: ID!, $year: Int!, $cover: String!) {
    addBook(name: $name, genres: $genres, pages: $pages, authorId: $authorId, year: $year, cover: $cover) {
      id
      name
      genres {
        name
      }
      pages
      author {
        name
      }
      year
      cover
    }
  }
`;