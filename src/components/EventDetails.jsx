import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GifPlayer from './GifPlayer';
import videoSourceVOG3 from '../assets/VOG3/WhatsApp Video 2024-12-19 at 10.28.23 PM.mp4';
import videoSourceVOG5 from '../assets/VOG5/WhatsApp Video 2025-02-18 at 7.12.11 PM.mp4';

function EventDetails({ event }) {
  const [isVolunteersOpen, setIsVolunteersOpen] = useState(false);
  const [isPhotosOpen, setIsPhotosOpen] = useState(false);
  const [isVideosOpen, setIsVideosOpen] = useState(false);

  const arabicPhrases = [
    { arabic: "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ", translation: "Our Lord! We have wronged ourselves. If You forgive us not, and bestow not upon us Your Mercy, we shall certainly be of the losers. (Quran 7:23)" },
    { arabic: "لَّا إِلَهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ ", translation: "No one has the right to be worshiped but You (O Allah), Glorified (and Exalted) are You. Truly, I have been of the wrong-doers.  (Qur'an 21:87)" },
    { arabic: "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ ", translation: "Our Lord! Forgive me and my parents, and the believers on the Day when the reckoning will be established.  (Quran 14:41)" },
    { arabic: "رَّبَّنَا عَلَيْكَ تَوَكَّلْنَا وَإِلَيْكَ أَنَبْنَا وَإِلَيْكَ الْمَصِيرُ ", translation: "Our Lord! In You we put our trust, and to You we turn in repentance, and to You is (our) final return.  (Quran 60:4)" },
    { arabic: "فَاطِرَ السَّمَاوَاتِ وَالأَرْضِ أَنتَ وَلِيِّي فِي الدُّنْيَا وَالآخِرَةِ تَوَفَّنِي مُسْلِمًا وَأَلْحِقْنِي بِالصَّالِحِينَ ", translation: "The Creator of the heavens and the earth! You are my Wali (Protector, Helper, Supporter, Guardian, etc.) in this world and in the Hereafter, cause me to die as a Muslim (the one submitting to Your Will), and join me with the righteous.  (Quran 12:101)" },
    { arabic: "رَبِّ اِنِّىۡۤ اَعُوۡذُ بِكَ اَنۡ اَسۡـئَلَكَ مَا لَـيۡسَ لِىۡ بِهٖ عِلۡمٌ​ؕ وَاِلَّا تَغۡفِرۡ لِىۡ وَتَرۡحَمۡنِىۡۤ اَكُنۡ مِّنَ الۡخٰسِرِيۡنَ", translation: "O my Lord! I seek refuge with You from asking You that of which I have no knowledge. And unless You forgive me and have mercy on me, I would indeed be one of the losers." },
    { arabic: "اللهم اغفر لي، وارحمني، واهدني، وعافني، وارزقني", translation: "O Allah! Forgive me, have mercy on me, guide me, guard me against harm and provide me with sustenance and salvation" },
    { arabic: "اَللّٰهُمَّ بَاعِدْ بَيْنِيْ وَبَيْنَ خَطَايَاىَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ ، اللَّهُمَّ نَقِّنِيْ مِنَ الْخَطَايَا كَمَا يُنَقَّى الثَّوْبُ الأَبْيَضُ مِنَ الدَّنَسِ ، اللَّهُمَّ اغْسِلْنِيْ مِنْ خَطَايَاىَ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ.", translation: "O Allah, distance me from my sins as You have distanced the East from the West. O Allah, purify me from my sins as white cloth is purified from dirt. O Allah, wash away my sins with water, snow and hail." },
    { arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", translation: "Our Lord! Give us in this world that which is good and in the Hereafter that which is good, and protect us from the torment of the Fire! (Quran 2:201)" },
    { arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ", translation: "Our Lord! Let not our hearts deviate (from the truth) after You have guided us, and grant us mercy from You. Truly, You are the Bestower. (Quran 3:8)" },
    { arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ", translation: "Our Lord! Pour forth on us patience and make us victorious over the disbelieving people. (Quran 2:250)" },
    { arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ", translation: "Our Lord! Accept (this service) from us. Verily! You are the All-Hearer, the All-Knower. (Quran 2:127)" },
    { arabic: "رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً لِّلَّذِينَ كَفَرُوا وَاغْفِرْ لَنَا رَبَّنَا إِنَّكَ أَنتَ الْعَزِيزُ الْحَكِيمُ", translation: "Our Lord! Make us not a trial for the disbelievers, and forgive us, Our Lord! You are the All-Mighty, the All-Wise. (Quran 60:5)" },
    { arabic: "رَبَّنَا آمَنَّا فَاغْفِرْ لَنَا وَارْحَمْنَا وَأَنتَ خَيْرُ الرَّاحِمِينَ", translation: "Our Lord! We believe, so forgive us, and have mercy on us, for You are the Best of all who show mercy! (Quran 23:109)" },
    { arabic: "رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ إِنَّ عَذَابَهَا كَانَ غَرَامًا", translation: "Our Lord! Avert from us the torment of Hell. Verily! Its torment is ever an inseparable, permanent punishment. (Quran 25:65)" },
    { arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا", translation: "Our Lord! Bestow on us from our wives and our offspring who will be the comfort of our eyes, and make us leaders for the Muttaqun (pious). (Quran 25:74)" }
  ];

  // Map each event to a specific dua based on its theme
  const eventDuaMap = {
    'event1': 0,  // Ramadan Charity Day - Seeking forgiveness and mercy
    'event2': 11, // Madrasah Charity Day - Acceptance of service
    'event3': 4,  // Vision of Good 3.0 - Seeking protection and guidance
    'event4': 12, // Quran + Islamic Books Donation - Acceptance of service
    'event5': 9,  // Every Drop Counts - Seeking guidance and mercy
    'event6': 10, // Flood Victims Support - Seeking patience and victory
    'event7': 3,  // Vision of Good 5.0 - Trust in Allah
    'event8': 14, // Vision of Good Project Sudan - Seeking mercy
    'event9': 8,  // Iftar for All - Seeking good in this world and hereafter
    'event10': 7, // Emergency Support: Somali Refugee Family - Purification and forgiveness
    'event11': 6, // Rebuild Hope: Myanmar Refugee Family - Seeking guidance and healing
    'event12': 5, // Support for Syrian Refugee Family - Seeking refuge and knowledge
    'event13': 15, // Eid Joy: Iraqi Family Support - Family blessings
    'event14': 2, // Streams of Mercy Cause - Forgiveness for all believers
    'event15': 1, // Support for Yemeni Family - Seeking forgiveness
    'event16': 13  // Support for Local Malaysian Family - Seeking mercy and protection
  };

  // Get the appropriate dua for the current event
  const currentDua = arabicPhrases[eventDuaMap[event.id] || 0];

  // Separate GIFs from other photos
  const gifs = event.photos?.filter(photo => 
    photo.toLowerCase().endsWith('.gif')
  ) || [];
  
  const photos = event.photos?.filter(photo => 
    !photo.toLowerCase().endsWith('.gif')
  ) || [];

  const allPhotos = [...photos, ...(event.fullSizePhotos || [])];
  
  // Check if event has videos
  const hasVideos = event.id === 'event3' || event.id === 'event7';
  const videoSource = event.id === 'event3' ? videoSourceVOG3 : videoSourceVOG5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 p-4 md:p-12 bg-gray-50 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl md:text-4xl font-light tracking-tight mb-4" style={{ color: '#2b1c12' }}>{event.name}</h2>
      <p className="text-base md:text-lg mb-8 md:mb-12 font-light leading-relaxed max-w-3xl" style={{ color: '#2b1c12' }}>{event.description}</p>

      {/* Volunteers Section */}
      <div className="mb-8">
        <button 
          onClick={() => setIsVolunteersOpen(!isVolunteersOpen)}
          className="w-full flex items-center justify-between p-4 rounded-lg shadow-md transition-colors duration-300 hover:bg-[#2b1c12]/5"
          style={{ backgroundColor: '#2b1c12', color: 'white' }}
        >
          <h3 className="text-xl md:text-2xl font-light tracking-tight">Volunteers</h3>
          <motion.svg 
            animate={{ rotate: isVolunteersOpen ? 180 : 0 }}
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
          {isVolunteersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mt-4">
                {event.participants.filter(participant => participant.trim()).map((participant, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-4 rounded-lg text-center shadow-md relative overflow-hidden"
                    style={{ backgroundColor: '#2b1c12', color: 'white' }}
                  >
                    <div className="absolute inset-0 opacity-15" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%238B9A47' stroke-width='1'%3E%3Cpath d='M50 20L80 40L65 75H35L20 40z' /%3E%3Cpath d='M0 0L30 20L15 55H-15L-30 20z' /%3E%3Cpath d='M100 0L130 20L115 55H85L70 20z' /%3E%3Cpath d='M50 -30L80 -10L65 25H35L20 -10z' /%3E%3Cpath d='M50 70L80 90L65 125H35L20 90z' /%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: '100px 100px', backgroundRepeat: 'repeat'}} />
                    <div className="absolute inset-0 opacity-10" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%236B7A37' stroke-width='1' transform='rotate(72 50 50)'%3E%3Cpath d='M50 20L80 40L65 75H35L20 40z' /%3E%3Cpath d='M0 0L30 20L15 55H-15L-30 20z' /%3E%3Cpath d='M100 0L130 20L115 55H85L70 20z' /%3E%3Cpath d='M50 -30L80 -10L65 25H35L20 -10z' /%3E%3Cpath d='M50 70L80 90L65 125H35L20 90z' /%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: '100px 100px', backgroundRepeat: 'repeat'}} />
                    <span className="relative z-10">{participant}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Photos Section */}
      {allPhotos.length > 0 && (
        <div className="mb-8">
          <button 
            onClick={() => setIsPhotosOpen(!isPhotosOpen)}
            className="w-full flex items-center justify-between p-4 rounded-lg shadow-md transition-colors duration-300 hover:bg-[#2b1c12]/5"
            style={{ backgroundColor: '#2b1c12', color: 'white' }}
          >
            <h3 className="text-xl md:text-2xl font-light tracking-tight">Photos</h3>
            <motion.svg 
              animate={{ rotate: isPhotosOpen ? 180 : 0 }}
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
            {isPhotosOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden mt-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {allPhotos.map((photo, index) => (
                    <div 
                      key={`photo-${index}`}
                      className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group"
                    >
                      <img
                        src={photo}
                        alt={`${event.name} - Photo ${index + 1}`}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                  {gifs.map((gif, index) => (
                    <GifPlayer 
                      key={`gif-${index}`} 
                      gifs={[gif]} 
                      className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Videos Section */}
      {hasVideos && (
        <div className="mb-8">
          <button 
            onClick={() => setIsVideosOpen(!isVideosOpen)}
            className="w-full flex items-center justify-between p-4 rounded-lg shadow-md transition-colors duration-300 hover:bg-[#2b1c12]/5"
            style={{ backgroundColor: '#2b1c12', color: 'white' }}
          >
            <h3 className="text-xl md:text-2xl font-light tracking-tight">Videos</h3>
            <motion.svg 
              animate={{ rotate: isVideosOpen ? 180 : 0 }}
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
            {isVideosOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden mt-4"
              >
                <div className="max-w-2xl mx-auto">
                  <video
                    className="w-full rounded-lg shadow-md aspect-video"
                    controls
                    src={videoSource}
                  >
                    Your browser does not support the video tag.
                  </video>
                  <p className="text-center mt-4 text-sm text-gray-600 italic">
                    {event.id === 'event3' 
                      ? "Distribution of food packages and essential supplies to 300 individuals in need"
                      : "Distribution of over 200 food packs and 300 pieces of clothing to underprivileged communities"
                    }
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="text-center py-6 md:py-8 border-t border-[#2b1c12]/20" style={{ color: '#858500' }}>
        <p className="text-2xl md:text-3xl mb-2 font-arabic leading-relaxed">
          {currentDua.arabic}
        </p>
        <p className="text-xs md:text-sm italic">
          {currentDua.translation}
        </p>
      </div>
    </motion.div>
  );
}

export default EventDetails;