import { useEffect, useState } from "react";
import { getImages } from "../../image-api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import SearchBar from "../SearchBar/SearchBar";
import { Image } from "./App.types";
import css from "./App.module.css";

interface Responce{
  results: [];
  total: number;
}

export default function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPage, setTotalPage] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  useEffect(() => {
    if (searchQuery.trim() === "") {
      return;
    }

    async function fetchImages() :Promise<void>{
      try {
        setLoading(true);
        setError(false);
        const { results, total } = await getImages<Responce>(searchQuery, page);
        setImages((prevState) => [...prevState, ...results]);
        setTotalPage(page < Math.ceil(total / 15));
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [searchQuery, page]);

  const handleSearch = async (searchImg: string) => {
    setSearchQuery(searchImg);
    setPage(1);
    setImages([]);
  };

  const hendleLoadMore = async () => {
    setPage(page + 1);
  };

  ///////////
  const openModal = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImageUrl("");
    setModalIsOpen(false);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      {error && <ErrorMessage />}
      <div className={css.wrapper}>
      {images.length > 0 && (
        <ImageGallery items={images} onImageClick={openModal} />
      )}
      {loading && <Loader />}
        {totalPage && <LoadMoreBtn onClick={hendleLoadMore} />}
      </div>

      <ImageModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        imageUrl={selectedImageUrl}
      />
    </div>
  );
}