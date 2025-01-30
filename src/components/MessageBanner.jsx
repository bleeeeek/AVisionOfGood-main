import React from 'react';
import { motion } from 'framer-motion';

function MessageBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 p-4 md:p-8 bg-gray-50 rounded-xl shadow-lg"
    >
      <p className="text-center text-gray-600 italic max-w-3xl mx-auto">
        Alhamdulillah, while we were deeply engaged in serving the cause of Allah ﷻ, 
        our focus remained on the work at hand rather than documentation. We ask Allah ﷻ 
        to accept our humble efforts and pray that these simple captures convey the spirit of our service.
      </p>
    </motion.div>
  );
}

export default MessageBanner; 