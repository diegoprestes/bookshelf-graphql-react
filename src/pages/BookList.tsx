import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Book } from '../interfaces';
import { getBooksQuery } from '../queries';
import BookCard from '../components/BookCard';

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  
  return (
    <section>
      <ul className="book-list flex -mx-3 my-8">
        { data.books.map((book: Book) => (
          <li key={book.id} className="m-3">
            <Link to={`/book/${book.id}`}>
              <BookCard name={book.name} cover={book.cover} author={book.author.name} />
            </Link>
          </li>
        ))}
      </ul>
      <Link to='/book/new'>
        <button className="bg-red-600 text-white py-2 px-5 rounded-xl transition hover:bg-red-500">New book</button>
      </Link>
    </section>
  );
};

export default BookList;