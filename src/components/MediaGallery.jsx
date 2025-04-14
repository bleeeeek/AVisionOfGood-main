import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GifPlayer from './GifPlayer';
import videoSourceVOG3 from '../assets/VOG3/WhatsApp Video 2024-12-19 at 10.28.23 PM.mp4';
import videoSourceVOG5 from '../assets/VOG5/WhatsApp Video 2025-02-18 at 7.12.11 PM.mp4';

function MediaGallery({ events }) {
  const [openEventId, setOpenEventId] = useState(null);
  
  const toggleEvent = (eventId) => {
    setOpenEventId(openEventId === eventId ? null : eventId);
  };

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
          <p className="text-center mt-4 text-sm text-gray-600 italic">
            Distribution of food packages and essential supplies to 300 individuals in need during Vision of Good 3.0
          </p>
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
          <p className="text-center mt-4 text-sm text-gray-600 italic">
            Distribution of over 200 food packs and 300 pieces of clothing to underprivileged communities during Vision of Good 5.0
          </p>
        </div>
      </motion.div>

      {/* Event-specific Photo Galleries */}
      {events.map((event) => {
        const hasPhotos = (event.photos && event.photos.length > 0) || 
                         (event.fullSizePhotos && event.fullSizePhotos.length > 0);
        
        if (!hasPhotos) return null;

        const allEventPhotos = [
          ...(event.photos || []),
          ...(event.fullSizePhotos || [])
        ];

        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 p-4 md:p-8 bg-gray-50 rounded-xl shadow-lg"
          >
            <button 
              onClick={() => toggleEvent(event.id)}
              className="w-full flex items-center justify-between p-4 rounded-lg shadow-md transition-colors duration-300 hover:bg-[#2b1c12]/5"
              style={{ backgroundColor: '#2b1c12', color: 'white' }}
            >
              <h3 className="text-xl md:text-2xl font-light tracking-tight">{event.name}</h3>
              <motion.svg 
                animate={{ rotate: openEventId === event.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                viewBox="0 0 24 24" 
                width="24" 
                height="24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>
            
            <AnimatePresence>
              {openEventId === event.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden mt-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {allEventPhotos.map((photo, index) => (
                      photo.toLowerCase().endsWith('.gif') ? (
                        <GifPlayer 
                          key={`${event.id}-gif-${index}`} 
                          gifs={[photo]} 
                          className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                        />
                      ) : (
                        <div 
                          key={`${event.id}-photo-${index}`}
                          className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group"
                        >
                          <img
                            src={photo}
                            alt={`${event.name} - Photo ${index + 1}`}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </>
  );
}

export default MediaGallery; 