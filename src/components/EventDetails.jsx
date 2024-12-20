import React from 'react';
import { motion } from 'framer-motion';

function EventDetails({ event }) {
  const arabicPhrases = [
    { arabic: "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ", translation: "Our Lord! We have wronged ourselves. If You forgive us not, and bestow not upon us Your Mercy, we shall certainly be of the losers. (Quran 7:23)" },
    { arabic: "لَّا إِلَهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ ", translation: "No one has the right to be worshiped but You (O Allah), Glorified (and Exalted) are You. Truly, I have been of the wrong-doers.  (Qur'an 21:87)" },
    { arabic: "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ ", translation: "Our Lord! Forgive me and my parents, and the believers on the Day when the reckoning will be established.  (Quran 14:41)" },
    { arabic: "رَّبَّنَا عَلَيْكَ تَوَكَّلْنَا وَإِلَيْكَ أَنَبْنَا وَإِلَيْكَ الْمَصِيرُ ", translation: "Our Lord! In You we put our trust, and to You we turn in repentance, and to You is (our) final return.  (Quran 60:4)" },
    { arabic: "فَاطِرَ السَّمَاوَاتِ وَالأَرْضِ أَنتَ وَلِيِّي فِي الدُّنُيَا وَالآخِرَةِ تَوَفَّنِي مُسْلِمًا وَأَلْحِقْنِي بِالصَّالِحِينَ ", translation: "“The Creator of the heavens and the earth! You are my Wali (Protector, Helper, Supporter, Guardian, etc.) in this world and in the Hereafter, cause me to die as a Muslim (the one submitting to Your Will), and join me with the righteous.”  (Quran 12:101)" },
    { arabic: "رَبِّ اِنِّىۡۤ اَعُوۡذُ بِكَ اَنۡ اَسۡـئَلَكَ مَا لَـيۡسَ لِىۡ بِهٖ عِلۡمٌ​ؕ وَاِلَّا تَغۡفِرۡ لِىۡ وَتَرۡحَمۡنِىۡۤ اَكُنۡ مِّنَ الۡخٰسِرِيۡنَ", translation: "O my Lord! I seek refuge with You from asking You that of which I have no knowledge. And unless You forgive me and have mercy on me, I would indeed be one of the losers." }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 p-4 md:p-12 bg-gray-50 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl md:text-4xl font-light tracking-tight mb-4" style={{ color: '#2b1c12' }}>{event.name}</h2>
      <p className="text-base md:text-lg mb-8 md:mb-12 font-light leading-relaxed max-w-3xl" style={{ color: '#2b1c12' }}>{event.description}</p>

      <div className="mb-8 md:mb-12">
        <h3 className="text-xl md:text-2xl font-light tracking-tight mb-4 md:mb-6" style={{ color: '#2b1c12' }}> Volunteers</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {event.participants.map((participant, index) => (
            <div
              key={index}
              className="p-4 rounded-lg text-center shadow-md relative overflow-hidden"
              style={{ backgroundColor: '#2b1c12', color: 'white' }}
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
              <span className="relative z-10">{participant}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center py-6 md:py-8 border-t border-[#2b1c12]/20" style={{ color: '#858500' }}>
        <p className="text-2xl md:text-3xl mb-2 font-arabic leading-relaxed">
          {arabicPhrases[event.id.slice(-1) % arabicPhrases.length].arabic}
        </p>
        <p className="text-xs md:text-sm italic">
          {arabicPhrases[event.id.slice(-1) % arabicPhrases.length].translation}
        </p>
      </div>
    </motion.div>
  );
}

export default EventDetails;