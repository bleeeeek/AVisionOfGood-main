import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

function PhotoGallery({ events }) {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Combine all photos from all events into a single array
  const allPhotos = events.reduce((acc, event) => {
    const eventPhotos = event.photos.map((photoUrl, index) => ({
      url: photoUrl,
      eventName: event.name,
      eventId: event.id,
      photoIndex: index
    }));
    return [...acc, ...eventPhotos];
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 p-4 md:p-12 bg-gray-50 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl md:text-4xl font-light tracking-tight mb-4" style={{ color: '#2b1c12' }}>
        Photo Gallery
      </h2>
      
      <p className="text-center mb-8 text-gray-600 italic max-w-3xl mx-auto">
        Alhamdulillah, while we were deeply engaged in serving the cause of Allah ﷻ, 
        our focus remained on the work at hand rather than documentation. We ask Allah ﷻ 
        to accept our humble efforts and pray that these simple captures convey the spirit of our service.
      </p>

      <div 
        ref={scrollRef}
        className="h-[80vh] overflow-hidden hover:overflow-y-auto transition-all duration-300 scrollbar-hide"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {allPhotos.map((photo, index) => (
            <div 
              key={`${photo.eventId}-photo-${photo.photoIndex}`}
              className="break-inside-avoid relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src={photo.url}
                alt={`${photo.eventName} - Photo ${photo.photoIndex + 1}`}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm">{photo.eventName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default PhotoGallery; 