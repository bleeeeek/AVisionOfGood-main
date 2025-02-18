import React from 'react';
import videoSourceVOG3 from '../assets/VOG3/WhatsApp Video 2024-12-19 at 10.28.23 PM.mp4';
import videoSourceVOG5 from '../assets/VOG5/WhatsApp Video 2025-02-18 at 7.12.11 PM.mp4';

function VideoCard() {
  return (
    <>
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">A Vision of Good 3.0</h3>
          <div className="aspect-square w-full relative">
            <video
              className="w-full h-full rounded-lg"
              controls
              src={videoSourceVOG3}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Vision of Good 5.0</h3>
          <div className="aspect-square w-full relative">
            <video
              className="w-full h-full rounded-lg"
              controls
              src={videoSourceVOG5}
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="text-center mt-4 text-gray-600 italic">
            Alhamdulillah, while we were deeply engaged in serving the cause of Allah ﷻ, 
            our focus remained on the work at hand rather than documentation. We ask Allah ﷻ 
            to accept our humble efforts and pray that these simple captures convey the spirit of our service.
          </p>
        </div>
      </div>
    </>
  );
}

export default VideoCard; 