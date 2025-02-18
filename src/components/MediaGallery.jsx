import React from 'react';
import { motion } from 'framer-motion';
import GifPlayer from './GifPlayer';
import videoSourceVOG3 from '../assets/VOG3/WhatsApp Video 2024-12-19 at 10.28.23 PM.mp4';
import videoSourceVOG5 from '../assets/VOG5/WhatsApp Video 2025-02-18 at 7.12.11 PM.mp4';

function MediaGallery({ events }) {
  // Combine all photos from all events
  const allMedia = events.reduce((acc, event) => {
    const eventMedia = {
      photos: event.photos || [],
      fullSizePhotos: event.fullSizePhotos || [],
    };
    return [...acc, eventMedia];
  }, []);

  // Combine all photos into a single array
  const allPhotos = allMedia.reduce((acc, media) => {
    return [...acc, ...media.photos, ...media.fullSizePhotos];
  }, []);

  return (
    <>
      {/* VOG 3.0 Video Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 p-4 md:p-8 bg-gray-50 rounded-xl shadow-lg"
      >
        <div className="max-w-2xl mx-auto">
          <video
            className="w-full rounded-lg shadow-md aspect-video"
            controls
            src={videoSourceVOG3}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </motion.div>

      {/* VOG 5.0 Video Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 p-4 md:p-8 bg-gray-50 rounded-xl shadow-lg"
      >
        <div className="max-w-2xl mx-auto">
          <video
            className="w-full rounded-lg shadow-md aspect-video"
            controls
            src={videoSourceVOG5}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </motion.div>

      {/* Photo Gallery Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 md:p-8 bg-gray-50 rounded-xl shadow-lg"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allPhotos.map((photo, index) => (
            photo.toLowerCase().endsWith('.gif') ? (
              <GifPlayer 
                key={`gif-${index}`} 
                gifs={[photo]} 
                className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              />
            ) : (
              <div 
                key={`photo-${index}`}
                className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <img
                  src={photo}
                  alt={`Gallery photo ${index + 1}`}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )
          ))}
        </div>
      </motion.div>
    </>
  );
}

export default MediaGallery; 