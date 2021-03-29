
interface BookCardProps {
  name: string;
  cover: string;
  author: string;
}

const BookCard = (props: BookCardProps) => {
  return (
    <div className="book-card">
      <img className="book-card__cover" src={props.cover} alt={props.name} />
      <p className="book-card__name">{props.name}</p>
      <p className="book-card__author">{props.author}</p>
    </div>
  );
};

export default BookCard;