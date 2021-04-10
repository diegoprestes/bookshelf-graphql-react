
interface BookCardProps {
  name: string;
  cover: string;
  author: string;
}

const BookCard = (props: BookCardProps) => {
  return (
    <div className="book-card w-44 border border-solid border-black rounded overflow-hidden">
      <img className="book-card__cover w-44 h-64 object-cover" src={props.cover} alt={props.name} />
      <p className="book-card__name px-2 my-2 text-sm">
        {props.name}
      </p>
      <p className="book-card__author px-2 mb-2 text-sm">
        {props.author}
      </p>
    </div>
  );
};

export default BookCard;