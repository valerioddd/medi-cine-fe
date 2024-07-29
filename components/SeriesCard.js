import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SeriesCard = ({ series }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const router = useRouter();

  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
  };

  const handleCardClick = () => {
    router.push(`/series/${series.id}`);
  };

  return (
    <div 
      className="w-64 h-80 m-4 perspective"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        <div className="absolute w-full h-full backface-hidden shadow-lg rounded-lg bg-white">
          <img src={series.image} alt={series.title} className="w-full h-2/3 object-cover rounded-t-lg" />
          <h2 className="text-center mt-2 text-xl font-bold text-blue-hospital">{series.title}</h2>
        </div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-light p-4 rounded-lg shadow-lg cursor-pointer" onClick={handleCardClick}>
          <h3 className="font-bold text-lg text-center text-blue-hospital">{series.title}</h3>
          <p className="mt-2 text-black">Languages: {series.languages.join(', ')}</p>
          <p className="mt-2 text-black">Reliability: {series.reliability}/100</p>
          <p className="mt-2 text-black">Number of Episodes: {series.episodes.length}</p>
        </div>
      </div>
    </div>
  );
};

export default SeriesCard;
