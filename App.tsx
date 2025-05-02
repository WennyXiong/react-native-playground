import React from 'react';
import {PaperProvider} from 'react-native-paper';
import LaunchOverview from './Components/LaunchOverview';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  // DebugInstructions,
  // Header,
  // LearnMoreLinks,
  // ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const safePadding = '5%';

  return (
    <PaperProvider>
      <View style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView style={backgroundStyle}>
          <View style={styles.header}>
            <Text style={styles.h1}>Front End Assignment</Text>
          </View>
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
              paddingHorizontal: safePadding,
              paddingBottom: safePadding,
            }}>
            <LaunchOverview />
          </View>
        </ScrollView>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: '25%',
    paddingRight: '5%',
    paddingBottom: '5%',
    paddingLeft: '10%',
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
