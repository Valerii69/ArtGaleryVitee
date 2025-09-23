import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../firebase/firebaseConfig";
import { inputFields } from "../../../data/inputFields.js";
import NoImages_re from "../../../public/Images/NoImagesR.jpg";
import "./ArtManager.css";

const CLOUDINARY_UPLOAD_PRESET = "artwork_upload";
const CLOUDINARY_CLOUD_NAME = "dinetjtpb";


export function ArtManager() {
  const [form, setForm] = useState({
    artist: "",
    title: "",
    date: "",
    height: "100%",
    width: "100%",
    size: "",
    price: "",
    src: NoImages_re,
    tags: [],
  });
  const [newTag, setNewTag] = useState("");
  const [editId, setEditId] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [filters, setFilters] = useState({
    Artist: "",
    Title: "",
    Date: "",
    Height: "",
    Width: "",
    Size: "",
    Price: "",
  });

  const artworksRef = collection(db, "artGalleryDataFireBase");

  const fetchArtworks = async () => {
    const data = await getDocs(artworksRef);
    setArtworks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    const tempUrl = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, src: tempUrl }));

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.secure_url) {
        setForm((prev) => ({ ...prev, src: data.secure_url }));
      }
    } catch (err) {
      console.error("Image upload failed", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (newTag && !form.tags.includes(newTag)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, newTag] }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      height: Number(form.height),
      width: Number(form.width),
      price: Number(form.price),
    };

    if (editId) {
      const docRef = doc(db, "artGalleryDataFireBase", editId);
      await updateDoc(docRef, payload);
    } else {
      await addDoc(artworksRef, payload);
    }

    setForm({
      artist: "",
      title: "",
      date: "",
      height: "",
      width: "",
      size: "",
      price: "",
      src: NoImages_re,
      tags: [],
    });
    setEditId(null);
    fetchArtworks();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "artGalleryDataFireBase", id));
    fetchArtworks();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredArtworks = artworks.filter((art) => {
    return Object.keys(filters).every((key) => {
      const filterVal = filters[key];
      if (!filterVal) return true;
      return String(art[key] ?? "")
        .toLowerCase()
        .includes(filterVal.toLowerCase());
    });
  });

  return (
    <div className="art-manager">
        {/* Фільтр */}
      <div className="filter-bar">
        <h3>Filter Artworks</h3>
        {Object.keys(filters).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={`${key}`}
            value={filters[key]}
            onChange={handleFilterChange}
            className={filters[key] ? "filter-input active" : "filter-input"}
          />
        ))}
      </div>

      <div className="art-form">
        <label htmlFor="picture" className="picture">
          Choose a picture:
        </label>

        {form.src && (
          <img src={form.src} alt="preview" className="img-preview" />
        )}

        <input
          type="file"
          name="picture"
          accept="image/png, image/jpeg"
          onChange={handleImageUpload}
        />

        {inputFields.map((field) => (
          <input
            key={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={form[field.name]}
            onChange={handleChange}
          />
        ))}

        <div className="tag-list">
          {form.tags.map((tag) => (
            <span
              key={tag}
              onClick={() => handleRemoveTag(tag)}
              className="tag-item"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="tag-item-input">
          <input
            placeholder="Add tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <button type="button" onClick={handleAddTag}>
            Add Tag
          </button>
        </div>

        <hr />

        <div className="buttonAdd">
          <button onClick={handleSubmit}>
            {editId ? "Update Artwork" : "Add Artwork"}
          </button>
        </div>

        <div className="art-preview">
          {filteredArtworks.map((art) => (
            <div key={art.id} className="art-card">
              <img src={art.src} alt={art.title} />
              <div className="title">
                title: {art.title} by {art.artist}
              </div>
              <div className="details">
                <div>
                  <span>Price:</span> {art.price} €
                </div>
                <div>
                  <span>Size:</span> {art.size}
                </div>
                <div>
                  <span>Tags:</span> {art.tags?.join(", ")}
                </div>
              </div>
              <div className="buttons">
                <button onClick={() => handleEdit(art)} className="edit">
                  Edit
                </button>
                <button onClick={() => handleDelete(art.id)} className="delete">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
