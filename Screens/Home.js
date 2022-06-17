import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';

import Colors from '../constant/Colors';
import WeatherView from '../components/WeatherView';
import EnvVariable from '../constant/EnvVariable';

const Home = () => {
  const [city, setCity] = useState('');
  const [lat, setLat] = useState(undefined);
  const [lon, setLon] = useState(undefined);
  const [apiLoader, setApiLoader] = useState(false);

  // Search function with API call 
  const Search = () => {
    if (city != '') {
      setApiLoader(true);
      let webApiUrl =
        EnvVariable.API_HOST + city + '&appid=' + EnvVariable.API_KEY;
      axios
        .get(webApiUrl)
        .then(res => {
          if (res.data.length > 0) {
            setLat(res.data[0].lat);
            setLon(res.data[0].lon);
            console.log('response=' + JSON.stringify(res.data));
            // setEmptyResponse(true);
            setApiLoader(false);
          } else {
            Alert.alert('','No such city',[{text:'Ok', style:'cancel'}])
            // setEmptyResponse(false);
            setLat('');
            setLon('');
            setApiLoader(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
      setTimeout(() => {
        setApiLoader(false);
      }, 5000);
    } else {
      Alert.alert('', 'Please Insert City', [{text: 'Ok', style: 'cancel'}]);
    }
  };

  return (
    // Main View
    <View style={{flex: 1}}>
      {/* Loader starts */}
      {apiLoader ? (
        <View style={{justifyContent: 'center', flex: 1}}>
          <ActivityIndicator size={'large'} />
        </View>
        // Loader ends
      ) : (
        <View>
          <ScrollView>
            <View style={styles.screenMargin}>

              {/* Search View */}
              <View style={styles.searchViewStyle}>
                <TextInput
                  style={styles.searchInputText}
                  value={city}
                  onChangeText={value => setCity(value)}
                />
                <Text style={styles.searchText} 
                onPress={Search}>
                  Search
                </Text>
              </View>
              {/* Search View Ends */}

              {/* Weather View component starts */}
              <View>{lat!= undefined && lon!= undefined?<WeatherView lat={lat!=''?lat:null} lon={lon!=''?lon:null}/>:null}</View>
              {/* Weather View component ends */}
            </View>
          </ScrollView>
        </View>
      )}
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
