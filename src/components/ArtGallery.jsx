import { useState, useEffect } from "react";
import { Nav } from "../components/Nav/Nav";
import { GalleryItems } from "./ArtGallery/GalleryItems/GalleryItems";

import { db } from "../firebase/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";

// import { artGalleryData } from "../data/artGalleryData";
import "../../src/components/ArtGallery/art-gallery.css";

export default function ArtGallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [galleryData, setGalleryData] = useState([]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    const getAllGallery = async () => {
      const querySnapshot = await getDocs(
        collection(db, "artGalleryDataFireBase")
      );
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGalleryData(data);
    };

    getAllGallery();
  }, []);
// local data
/* const filteredGallery = artGalleryData.filter((item) =>
    item.tags.some((tag) =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    )); */


  const filteredGallery = galleryData.filter((item) =>
    item.tags.some((tag) =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  console.log(+"1.5");
  return (
    <>
      <div id="ArtGallery" className="wide-art-gallery">
        <Nav handleSearch={handleSearch} />
      </div>
      <GalleryItems items={filteredGallery} />
    </>
  );
}
