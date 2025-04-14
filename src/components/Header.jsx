import React from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import logo from '../Img/Logo_transparent_bg.png';

function Header() {
  return (
    <header className="bg-white py-3 md:py-6 px-4 md:px-6 border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/80">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Logo" className="h-12 md:h-20 w-auto" />
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/avisionofgood/?igsh=MXNnaTV4aTl3NWQyMA%3D%3D#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-[#2b1c12] hover:text-[#8B9A47] transition-colors duration-300"
              aria-label="Follow us on Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://chat.whatsapp.com/IbE37DViFVp1m4izVCMul0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-[#2b1c12] hover:text-[#8B9A47] transition-colors duration-300"
              aria-label="Join our WhatsApp group"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-2xl md:text-4xl font-light tracking-tight text-black">
            A Vision of Good
          </h1>
          <span className="text-xl md:text-2xl font-light text-black mt-1 font-arabic">
            رؤية الخير
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;