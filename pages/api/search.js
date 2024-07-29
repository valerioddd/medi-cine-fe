export default function handler(req, res) {
    if (req.method === 'POST') {
      const { tags } = req.body;
  
      // Simulazione dati di esempio
      const seriesData = [
        {
          id: '1',
          title: "Grey's Anatomy",
          languages: ['English', 'Spanish'],
          reliability: 'High',
          episodes: [
            {
              title: "A Hard Day's Night",
              season: 1,
              episodeNumber: 1,
              description: "First episode of Grey's Anatomy.",
              streamingLink: 'https://example.com/greys-anatomy-s01e01',
              tags: ['surgery', 'emergency'],
            },
            // Aggiungi altri episodi qui
          ],
        },
        {
          id: '2',
          title: 'House M.D.',
          languages: ['English', 'French'],
          reliability: 'Medium',
          episodes: [
            {
              title: 'Humpty Dumpty',
              season: 2,
              episodeNumber: 3,
              description: 'Third episode of the second season of House M.D.',
              streamingLink: 'https://example.com/house-md-s02e03',
              tags: ['diagnosis', 'infectious disease'],
            },
            // Aggiungi altri episodi qui
          ],
        },
      ];
  
      // Filtro basato sui tag
      const filteredSeries = seriesData.filter(series => 
        series.episodes.some(episode => 
          episode.tags.some(tag => tags.includes(tag))
        )
      );
  
      res.status(200).json(filteredSeries);
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  