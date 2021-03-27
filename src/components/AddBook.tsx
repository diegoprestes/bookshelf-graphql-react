import { useState, FormEvent } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Author } from '../interfaces';
import { getAuthorsQuery, getBooksQuery, addBookMutation } from '../queries';

const AddBook = () => {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [ addBook, addBookResponse ] = useMutation(addBookMutation);

  const renderOptions = () => {
    if (loading) return (<option>Loading...</option>);
    if (error) return <option>Error :(</option>;

    return data.authors.map((author: Author) => (
      <option key={author.id} value={author.id}>{author.name}</option>
    ));
  }

  const handleAddBook = (event: FormEvent) => {
    event.preventDefault();

    addBook({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
    setName('');
    setGenre('');
  }
  
  return (
    <div>
      <form id="add-book" onSubmit={handleAddBook}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={(event) => setName(event.target.value)} />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={(event) => setGenre(event.target.value)} />
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={(event) => setAuthorId(event.target.value)}>
            <option>Select Author</option>
            { renderOptions() }
          </select>
        </div>

        <button>+</button>
      </form>
    </div>
  );
};

export default AddBook;