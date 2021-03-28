import { useState, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { Author, Genre } from '../interfaces';
import { getBooksQuery, addBookMutation } from '../queries';
import { useAuthorAndGenresQuery } from '../hooks/useAuthorAndGenresQuery';

const AddBook = () => {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState<string[]>([]);
  const [pages, setPages] = useState('');
  const [cover, setCover] = useState('');
  const [year, setYear] = useState('');
  const [authorId, setAuthorId] = useState('');

  const { authors, genres } = useAuthorAndGenresQuery();
  const [ addBook ] = useMutation(addBookMutation);

  const renderAuthorOptions = () => {
    if (authors.loading) return (<option>Loading...</option>);
    if (authors.error) return <option>Error loading authors</option>;

    return authors.data.authors.map((author: Author) => (
      <option key={author.id} value={author.id}>{author.name}</option>
    ));
  }

  const renderGenresOptions = () => {
    if (genres.loading) return <option disabled>Loading...</option>;
    if (genres.error) return <option disabled>Error loading genres</option>;

    return genres.data.genres.map((genre: Genre) => (
      <option key={genre.id} value={genre.id}>{genre.name}</option>
    ));
  }

  const handleAddBook = (event: FormEvent) => {
    event.preventDefault();

    addBook({
      variables: {
        name,
        genres: genre,
        authorId,
        pages: parseInt(pages),
        cover,
        year: parseInt(year)
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
    setName('');
    setPages('');
    setCover('');
    setYear('');
  }

  function updateGenre(target:HTMLSelectElement) {
    const selectedGenres = Array.from(target.selectedOptions).map(option => option.value);
    setGenre(selectedGenres);
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
          <select onChange={(event) => updateGenre(event.target)} multiple>
            { renderGenresOptions() }
          </select>
        </div>

        <div className="field">
          <label>Number of pages:</label>
          <input type="text" onChange={(event) => setPages(event.target.value)} />
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={(event) => setAuthorId(event.target.value)}>
            <option>Select Author</option>
            { renderAuthorOptions() }
          </select>
        </div>

        <div className="field">
          <label>Year:</label>
          <input type="text" onChange={(event) => setYear(event.target.value)} />
        </div>

        <div className="field">
          <label>Cover:</label>
          <input type="text" onChange={(event) => setCover(event.target.value)} />
        </div>

        <button>+</button>
      </form>
    </div>
  );
};

export default AddBook;