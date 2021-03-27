import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Book } from '../interfaces';
import { getBooksQuery } from '../queries';
import BookDetails from './BookDetails';

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [bookId, setBookId] = useState('');
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <ul id="book-list">
        { data.books.map((book: Book) => (
          <li key={book.id} onClick={() => setBookId(book.id)}>{book.name}</li>
        ))}
      </ul>
      <BookDetails id={bookId} />
    </div>
  );
};

export default BookList;