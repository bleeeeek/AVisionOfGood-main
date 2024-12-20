import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

function EventsList({ events }) {
  // Duplicate events array more times to ensure smooth transition
  const duplicatedEvents = [...events, ...events, ...events, ...events, ...events];

  return (
    <div className="overflow-hidden py-12">
      <motion.div
        animate={{
          x: ["0%", "-50%"]  // Animate from 0% to -50% instead of fixed pixel values
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear"
        }}
        style={{
          width: "fit-content", // Ensure container fits content
          display: "flex",
          gap: "1.5rem" // 6 in tailwind
        }}
      >
        {duplicatedEvents.map((event, index) => (
          <Link
            key={`${event.id}-${index}`}
            to={event.id}
            smooth={true}
            duration={500}
            className="cursor-pointer flex-shrink-0" // Add flex-shrink-0 to prevent shrinking
          >
            <div 
              className="p-6 rounded-lg w-[240px] h-[120px] shadow-lg hover:scale-105 transition-all relative overflow-hidden"
              style={{ backgroundColor: '#2b1c12' }}
            >
              <div 
                className="absolute inset-0 opacity-15" 
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%238B9A47' stroke-width='1'%3E%3Cpath d='M50 20L80 40L65 75H35L20 40z' /%3E%3Cpath d='M0 0L30 20L15 55H-15L-30 20z' /%3E%3Cpath d='M100 0L130 20L115 55H85L70 20z' /%3E%3Cpath d='M50 -30L80 -10L65 25H35L20 -10z' /%3E%3Cpath d='M50 70L80 90L65 125H35L20 90z' /%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: '100px 100px',
                  backgroundRepeat: 'repeat'
                }}
              />
              <div 
                className="absolute inset-0 opacity-10" 
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%236B7A37' stroke-width='1' transform='rotate(72 50 50)'%3E%3Cpath d='M50 20L80 40L65 75H35L20 40z' /%3E%3Cpath d='M0 0L30 20L15 55H-15L-30 20z' /%3E%3Cpath d='M100 0L130 20L115 55H85L70 20z' /%3E%3Cpath d='M50 -30L80 -10L65 25H35L20 -10z' /%3E%3Cpath d='M50 70L80 90L65 125H35L20 90z' /%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: '100px 100px',
                  backgroundRepeat: 'repeat'
                }}
              />
              <div className="flex flex-col justify-between h-full relative z-10">
                <h3 className="text-xl font-light tracking-tight text-white">{event.name}</h3>
                <p className="text-sm text-gray-300 font-light">{event.date}</p>
              </div>
            </div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}

export default EventsList;