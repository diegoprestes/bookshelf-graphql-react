import { useQuery } from '@apollo/client';
import { Book } from '../interfaces';
import { getBookQuery } from '../queries';
import { useParams } from 'react-router-dom';

interface BookDetailsParams {
  bookId: string;
}

const BookDetails = () => {
  let { bookId } = useParams<BookDetailsParams>();
  console.log('detail', bookId);
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: {
      id: bookId
    },
    skip: !bookId
  });

  const renderBookItem = (key: string, value: string|number) => {
    return (
      <p className="mb-2">
        <strong className="mr-4">{key}</strong>
        <span>{value}</span>
      </p>
    )
  }

  const renderBook = () => {
    if (!bookId) return <p>No book selected...</p>;  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const book: Book = data.book;

    return (
      <>
        <img
          className="mr-24"
          src={book.cover}
          alt={book.name}
        />
        <div>
          <h2 className="text-2xl mb-8">{book.name}</h2>

          { renderBookItem('Genres:', book.genres.map(genre => genre.name).join(','))}
          { renderBookItem('Number of pages:', book.pages)}
          { renderBookItem('Author:', book.author.name)}
          { renderBookItem('Year:', book.year)}
          
          <p className="mb-2 font-bold">
            Other books from this author:
          </p>
          <ul className="other-books">
            {book.author.books.map(item => (
              <li key={item.id} className="list-disc ml-5">
                {item.name} ({item.year})
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  return (
    <section className="book-details flex my-8">
      {renderBook()}
    </section>
  );
};

export default BookDetails;