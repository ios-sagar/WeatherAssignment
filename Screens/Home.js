import React,{useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';

import Colors from '../constant/Colors';
import WeatherView from '../components/WeatherView';

const Home = () => {
  const [city, setCity] = useState('');
  return (
    // Main View
    <View style={{flex: 1}}>

      <ScrollView>
        <View style={styles.screenMargin}>
          
          {/* Search View */}
          <View style={styles.searchViewStyle}>
            <TextInput
              style={styles.searchInputText}
              value={city}
              onChangeText={value => setCity(value)}
            />
            <Text style={styles.searchText}>Search</Text>
          </View>
          {/* Search View Ends */}
        
        {/* Weather View component */}
          <WeatherView />

        </View>
      </ScrollView>
    </View>
    // Main View ends
  );
};

const styles = StyleSheet.create({
  searchViewStyle: {flexDirection: 'row', justifyContent: 'space-evenly'},
  searchInputText: {borderWidth: 1, padding: 10, width: '75%', borderRadius: 6},
  searchText: {
    textAlignVertical: 'center',
    color: Colors.textColor,
    fontSize: 20,
  },
  screenMargin: {marginHorizontal: '5%', marginTop: '5%'},
});

export default Home;
