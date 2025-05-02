import {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import axios from 'axios';

type Launch = {
  mission_name: string;
  launch_date_local: string;
  launch_site: string | null;
  links: {
    article_link: string | null;
    flickr_images: string[];
  };
  rocket: {
    rocket_name: string;
  };
};

const LaunchOverview: React.FC = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const query = `
      {
        launchesPast(limit: 10) {
          mission_name
          launch_date_local
          launch_site {
            site_name_long
          }
          links {
            article_link
            flickr_images
          }
          rocket {
            rocket_name
          }
        }
      }
    `;

    axios
      .post<{data: {launchesPast: Launch[]}}>(
        'https://main--spacex-l4uc6p.apollographos.net/graphql',
        {query},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        console.log('res:', res.data.data.launchesPast);
        setLaunches(res.data.data.launchesPast);
      })
      .catch(err => {
        setError('Failed to load launches');
        console.error('Failed to fetch launches:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        Launch Overview
      </Text>

      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}

      {!loading &&
        !error &&
        launches
          .sort(
            (a, b) =>
              new Date(a.launch_date_local).getTime() -
              new Date(b.launch_date_local).getTime(),
          )
          .map((launch, index) => (
            <Card key={index} style={styles.card}>
              <Card.Content>
                <Text variant="headlineMedium">{launch.mission_name}</Text>
                <Text variant="bodyMedium">
                  Rocket: {launch.rocket.rocket_name}
                </Text>
                <Text variant="bodySmall">
                  Date:{' '}
                  {new Date(launch.launch_date_local).toLocaleDateString()}
                </Text>
                {launch.launch_site && (
                  <Text variant="bodySmall">
                    Site: {launch.launch_site.site_name_long}
                  </Text>
                )}
                {launch.links.article_link && (
                  <Text variant="bodySmall" style={styles.link}>
                    📰 {launch.links.article_link}
                  </Text>
                )}
              </Card.Content>
            </Card>
          ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 4,
  },
});

export default LaunchOverview;
