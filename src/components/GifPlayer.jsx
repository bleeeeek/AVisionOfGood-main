import React, { useState, useEffect } from 'react';

function GifPlayer({ gifs }) {
  const [currentGifIndex, setCurrentGifIndex] = useState(0);

  useEffect(() => {
    if (!gifs || gifs.length === 0) return;

    const interval = setInterval(() => {
      setCurrentGifIndex((prevIndex) => (prevIndex + 1) % gifs.length);
    }, 5000); // Change GIF every 5 seconds

    return () => clearInterval(interval);
  }, [gifs]);

  if (!gifs || gifs.length === 0) return null;

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg">
      {gifs.map((gif, index) => (
        <img
          key={gif}
          src={gif}
          alt={`Animation ${index + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{
            opacity: index === currentGifIndex ? 1 : 0,
            zIndex: index === currentGifIndex ? 1 : 0
          }}
        />
      ))}
    </div>
  );
}

export default GifPlayer; 