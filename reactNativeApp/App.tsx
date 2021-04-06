/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import StyleSheet from 'react-native-media-query';

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [conditions, setConditions] = useState([]);

  useEffect(() => {
    fetch(
      'https://j6u6t4cnqc.execute-api.us-east-1.amazonaws.com/dev/api/condition',
    )
      .then(response => response.json())
      .then(json => {
        setConditions(json.conditions);
      });
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/* <Header /> */}
        <View
          style={[
            {
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            },
            styles.appContainer,
          ]}>
          <View style={styles.wrapper}>
            {conditions.map((condition, i) => {
              return (
                <View style={styles.conditionContainer} key={i}>
                  {'image' in condition ? (
                    <Image
                      style={styles.conditionImage}
                      source={{uri: condition['image']}}
                    />
                  ) : (
                    <View style={styles.rectangle} />
                  )}
                  <Section
                    title={'label' in condition ? condition['label'] : 'Title'}>
                    <Text style={styles.snippet}>
                      {'snippet' in condition ? condition['snippet'] : ''}
                      <Text style={styles.highlight}> find out more</Text>.
                    </Text>
                  </Section>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const {styles} = StyleSheet.create({
  appContainer: {
    paddingTop: 61,
    paddingBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  wrapper: {
    width: 300,
    '@media (min-width: 1024px)': {
      width: 1008,
    },
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sectionContainer: {
    marginTop: 10.53,
  },
  sectionTitle: {
    fontWeight: '700',
    fontFamily: 'Noto Sans',
    fontStyle: 'normal',
    fontSize: 22,
    lineHeight: 30,
    color: '#000',
  },
  sectionDescription: {
    fontWeight: '400',
    fontFamily: 'Noto Sans',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 19,
    color: '#000',
  },
  snippet: {
    fontWeight: '400',
    fontFamily: 'Noto Sans',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 19,
    color: '#000',
  },
  highlight: {
    fontWeight: '700',
    color: '#00CCB3',
  },
  conditionContainer: {
    marginBottom: 50,
    width: 300,
    '@media (min-width: 1024px)': {
      width: 228,
      marginLeft: 12,
      marginRight: 12,
      marginBottom: 51,
    },
  },
  conditionImage: {
    width: 300,
    height: 289.47,
    '@media (min-width: 1024px)': {
      width: 228,
      height: 220,
    },
  },
  rectangle: {
    width: 300,
    height: 289.47,
    backgroundColor: '#D8D8D8',
    border: '1px solid #979797',
    '@media (min-width: 1024px)': {
      width: 228,
      height: 220,
    },
  },
});

export default App;
