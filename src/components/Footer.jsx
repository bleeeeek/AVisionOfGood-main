import React from 'react';
import logo from '../Img/logo.png';

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
            <div className="flex flex-col">
              <span className="text-xl font-light">A Vision of Good</span>
              <span className="text-lg font-light font-arabic">رؤية الخير</span>
            </div>
          </div>
          
          <div className="text-gray-600 text-center italic">
            Ya Rab allow us to see each other in jannah.
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-gray-600">2023-2024 A Vision of Good</p>
            <div className="mt-2">
              <span className="text-gray-600 font-arabic">رَبَّنَا ٱبۡنِ لَنَا عِندَكَ بُيُوتً۬ا فِى ٱلۡجَنَّةِ</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 