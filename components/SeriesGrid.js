import React, { useState } from 'react';
import SeriesCard from './SeriesCard';

const SeriesGrid = ({ seriesData }) => {
  const handleCardClick = (series) => {
    setSelectedSeries(series);
  };

  const handleClosePanel = () => {
    setSelectedSeries(null);
  };

  return (
    <div className="flex">
      <div className="flex flex-wrap justify-center flex-grow">
        {seriesData.map(series => (
          <SeriesCard key={series.id} series={series} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default SeriesGrid;
