import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";


interface ImageGalleryProps{
  items: {
    id: string;
    slug: string;
    urls: {
  small: string;
  regular: string;
};
  }[];
  onImageClick: (slug: string) => void;
}




export default function ImageGallery ({ items, onImageClick }: ImageGalleryProps){
  return (
    <ul className={css.list}>
      {items.map(({ id, urls, slug }) => (
        <li key={id}>
          <ImageCard imgLink={urls} imgSlug={slug} onClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
}