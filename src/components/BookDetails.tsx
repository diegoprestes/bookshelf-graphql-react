import { useQuery } from '@apollo/client';
import { Book } from '../interfaces';
import { getBookQuery } from '../queries';

interface BookDetailsProps {
  id: string;
}

const BookDetails = (props: BookDetailsProps) => {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: {
      id: props.id
    },
    skip: !props.id
  });

  const renderBook = () => {
    if (!props.id) return <p>No book selected...</p>;  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const book: Book = data.book;

    return (
      <>
        <h2>{book.name}</h2>
        <p>Genres: {book.genres.map(genre => genre.name).join(',')}</p>
        <p>Number of pages: {book.pages}</p>
        <p>Author: {book.author.name}</p>
        <p>Year: {book.year}</p>
        
        <p>Other books from this author</p>
        <ul className="other-books">
          {book.author.books.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </>
    )
  }

  return (
    <div id="book-details">
      {renderBook()}
    </div>
  );
};

export default BookDetails;