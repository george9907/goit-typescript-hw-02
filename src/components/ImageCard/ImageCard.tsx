import css from "./ImageCard.module.css";

interface ImageCardProps {
  imgLink: {
    small: string;
    regular: string;
  };
  imgSlug: string;
  onClick: (imageUrl: string) => void;
}

export default function ImageCard({ imgLink: { small }, imgSlug, onClick }: ImageCardProps) {
  const handleClick = () => {
    onClick(small);
   
  };
  return (
    <div>
      <img
        className={css.card}
        src={small}
        alt={imgSlug}
        onClick={handleClick}
      />
    </div>
  );
}