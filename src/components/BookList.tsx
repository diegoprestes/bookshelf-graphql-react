import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Book } from '../interfaces';
import { getBooksQuery } from '../queries';
import BookCard from './BookCard';
import BookDetails from './BookDetails';

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [bookId, setBookId] = useState('');
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  
  console.log(data);

  return (
    <div>
      <ul id="book-list">
        { data.books.map((book: Book) => (
          <li key={book.id} onClick={() => setBookId(book.id)}>
            <BookCard name={book.name} cover={book.cover} author={book.author.name} />
          </li>
        ))}
      </ul>
      <BookDetails id={bookId} />
    </div>
  );
};

export default BookList;