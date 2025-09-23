import { useState } from "react";
import PropTypes from "prop-types";
import { ContactButton } from "../ContactButton/ContactButton";
import ReactPaginate from "react-paginate";
import { ArtCard } from "../ArtCard/ArtCard";
import "./galleryItems.css";

const ITEMS_PER_PAGE = 12;

export function GalleryItems({ items = [] }) {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentItems = items.slice(offset, offset + ITEMS_PER_PAGE);
  console.log(currentItems);
  const pageCount = Math.ceil(items.length / ITEMS_PER_PAGE);

  // const handleCardSelect = (selectedCard) => {
  //   console.log("Selected card:", selectedCard);
  // };

  return (
    <>
      <div id="galleryContainer" className="gallery-container">
        <ul className="gallery">
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <li key={index} className="gallery-item">
                <ArtCard
                  artist={item.artist}
                  title={item.title}
                  size={item.size}
                  price={item.price}
                  src={item.src}
                  // onCardClick={handleCardSelect}
                  width={item.width}
                  height={item.height}
                  date={item.date}
                  tags={item.tags.join(", ")}
                />
              </li>
            ))
          ) : (
            <p className="searchError">Nothing found {'('}</p>
          )}
        </ul>

        {pageCount > 1 && (
          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        )}
      </div>
      <ContactButton />
    </>
  );
}
GalleryItems.propTypes = {
  items: PropTypes.string,
};
