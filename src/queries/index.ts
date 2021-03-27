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
    }
  }
`;

export const getBookQuery = gql`
  query RootQueryType($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author{
        id
        name
        age
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
  mutation Mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;