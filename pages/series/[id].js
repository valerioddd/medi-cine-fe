import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import client from '../../lib/apolloClient';

const GET_SERIES_BY_ID = gql`
  query GetSeriesById($id: ID!) {
    seriesById(id: $id) {
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
        thumbnail
        streamingLinks {
          platform
          link
        }
        tags
      }
    }
  }
`;

const SeriesDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_SERIES_BY_ID, {
    variables: { id },
    client,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { seriesById: series } = data;

  const handleBackClick = () => {
    router.push('/');
  };

  return (
    <div className="relative bg-black text-white min-h-screen">
      <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${series.image})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(30%)', opacity: 0.5 }}></div>
      <div className="relative z-10 container mx-auto px-4 py-8">
        <button onClick={handleBackClick} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Back</button>
        <div className="flex">
          <div className="w-1/3"></div>
          <div className="ml-8 flex-grow">
            <h1 className="text-3xl font-bold">{series.title}</h1>
            <p className="mt-4">Languages: {series.languages.join(', ')}</p>
            <p className="mt-4">Reliability: {series.reliability}/100</p>
            <h2 className="text-2xl font-bold mt-8">Episodes</h2>
            <ul className="mt-4">
              {series.episodes.map((episode, index) => (
                <li key={index} className="mb-8 flex">
                  <img src={episode.thumbnail} alt={episode.title} className="w-24 h-24 object-cover rounded-lg mr-4"/>
                  <div>
                    <h3 className="text-xl font-semibold">{episode.title}</h3>
                    <p>Season: {episode.season}, Episode: {episode.episodeNumber}</p>
                    <p>{episode.description}</p>
                    <div className="flex items-center mt-2">
                      <span className="mr-2">Streaming on:</span>
                      <ul className="flex space-x-2">
                        {episode.streamingLinks.map(link => (
                          <li key={link.platform}>
                            <a href={link.link} className="text-blue-500 underline">
                              <button className="bg-green-500 text-white px-2 py-1 rounded">Play on {link.platform}</button>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>Tags: {episode.tags.join(', ')}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesDetails;
