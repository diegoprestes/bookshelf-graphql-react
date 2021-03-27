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
    }
  });

  const renderBook = () => {
    if (!props.id) return <p>No book selected...</p>;  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const book: Book = data.book;

    return (
      <>
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <ul className="other-books">
          {book.author.books.map(item => {
            return <li key={item.id}>{item.name}</li>
          })}
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