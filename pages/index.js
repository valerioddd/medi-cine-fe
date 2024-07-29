import React, { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import client from '../lib/apolloClient';
import SeriesGrid from '../components/SeriesGrid';
import SearchBar from '../components/SearchBar';

const SEARCH_SERIES_BY_EPISODE_TAGS = gql`
  query SearchSeriesByEpisodeTags($tags: [String!]) {
    seriesByEpisodeTags(tags: $tags) {
      id
      title
      languages
      reliability
      image
      episodes {
        title
        season
        episodeNumber
        description
        streamingLinks {
          platform
          link
        }
        tags
      }
    }
  }
`;

export default function Home() {
  const [seriesData, setSeriesData] = useState([]);
  const [searchSeries, { loading, data }] = useLazyQuery(SEARCH_SERIES_BY_EPISODE_TAGS, {
    client,
    onCompleted: (data) => {
      setSeriesData(data.seriesByEpisodeTags);
    }
  });

  const handleSearch = (tags) => {
    searchSeries({ variables: { tags } });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4 text-center">MediCine Finder</h1>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <SeriesGrid seriesData={seriesData} />
      )}
    </div>
  );
}
