import { useState } from "react";
import { Modal } from "../../Modal/Modal";
import PropTypes from "prop-types";
import "./artCard.css";

export function ArtCard(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const openModal = (imageSrc) => {
    // console.log("🔍 openModal executed, imageSrc:", imageSrc);
    setCurrentImage(imageSrc);
    setIsModalOpen(true);
  };

  return (
    <div id="cardContainer" className="card-container card-border">
      <img
        id="cardImage"
        loading="lazy"
        src={props.src}
        alt={`Artwork ${props.title} by ${props.artist}`}
        className="card-image"
        width={props.width}
        height={props.height}
        onClick={(e) => {
          e.stopPropagation();
          openModal(props.src);
        }}
      />
      <div className="overlay">
        <div id="cardTitleContainer" className="items card-title-container">
          <p id="cardTitle">{props.title}</p>
          <hr />
        </div>
        <div id="cardDateContainer" className="items card-date-container">
          <p id="cardDate">{props.artist}</p>
        </div>
      </div>

      {/* Модальне вікно */}
      <Modal
        title={props.title}
        artist={props.artist}
        tags={props.tags}
        date={props.date}
        price={props.price}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {currentImage && (
          <img
            src={currentImage}
            alt="Selected artwork"
            width={props.width}
            height={props.height}
            loading="lazy"
          />
        )}
      </Modal>
    </div>
  );
}

ArtCard.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags:PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  medium: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onCardClick: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
