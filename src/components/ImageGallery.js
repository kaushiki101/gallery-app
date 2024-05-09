import React, { useState, useEffect } from "react";
import "./ImageGallery.css";

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, [page]);

  const fetchImages = () => {
    setLoading(true);
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=10`)
      .then((response) => response.json())
      .then((data) => {
        setImages((prevImages) => [...prevImages, ...data]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setLoading(false);
      });
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="App">
      <header>
        <h1>Image Gallery App</h1>
      </header>
      <div className="gallery">
        {images.map((image) => (
          <img key={image.id} src={image.download_url} alt={image.author} />
        ))}
      </div>
      {loading && <div className="loading">Loading New Image..</div>}
      <div className="pagination">
        <button onClick={loadMore}>Load More Image</button>
      </div>
    </div>
  );
}

export default App;
