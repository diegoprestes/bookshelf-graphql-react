import { useQuery } from '@apollo/client';
import { getAuthorsQuery, getGenresQuery } from '../queries';

export const useAuthorAndGenresQuery = () => {
  const authors = useQuery(getAuthorsQuery);
  const genres = useQuery(getGenresQuery);

  return {
    authors,
    genres,
    loading: authors.loading || genres.loading
  };
};