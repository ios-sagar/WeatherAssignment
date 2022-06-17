import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';

import Colors from '../constant/Colors';
import WeatherView from '../components/WeatherView';
import EnvVariable from '../constant/EnvVariable';

const Home = () => {
  const [city, setCity] = useState(''); //State variable to declare city and is used if city value changes as per user's wish
  const [lat, setLat] = useState(''); //state variable to declare latitude and is used if latitude value changes as per user's wish
  const [lon, setLon] = useState(''); //state variable to declare longitude and is used if longitude value changes as per user's wish
  const [apiLoader, setApiLoader] = useState(false); // state variable to load and unload to show indicator whenever API call is made and is taking time to load.

  // Get lat, lon using search city query(Geolocation API implementation)
  const Search = () => {
    if (city != '') {
      setApiLoader(true);
      let webApiUrl=EnvVariable.API_HOST + city + '&appid=' + EnvVariable.API_KEY;
      axios.get(webApiUrl)
        .then(res => {
          if (res.data.length > 0) {
            setLat(res.data[0].lat);
            setLon(res.data[0].lon);
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
        .catch(error => {
          if (error == "TypeError: Network request failed") {
            Alert.alert('Oops!','Please check you network.',
                [{ text: 'OK' }],{ cancelable: false },
            );
        } else {
            Alert.alert('Oops',error + '',
                [{ text: 'OK' }],
                { cancelable: false },
            );
        }
        });
      
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
            <View style={styles.screenMargin}>

              {/* Search View */}
              <View style={styles.searchViewStyle}>
                <TextInput
                  style={styles.searchInputText}
                  value={city}
                  onChangeText={value => setCity(value)}
                  placeholder='Enter City'
                />
                <Text style={styles.searchText} onPress={Search}>
                  Search
                </Text>
              </View>
              {/* Search View Ends */}

              {/* Weather View component starts || Weather UI component will be invoked if lat, lon are found  */}
              {lat!="" && lon!=""?<View><WeatherView lat={lat!=''?lat:null} lon={lon!=''?lon:null}/></View>:null}
              
              {/* Weather View component ends */}
            </View>
      )}
    </View>
    // Main View ends
  );
};

const styles = StyleSheet.create({
  searchViewStyle: {flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '5%'},
  searchInputText: {borderWidth: 1, paddingVertical: 10,paddingHorizontal:10, width: '75%', borderRadius: 6},
  searchText: {
    textAlignVertical: 'center',
    color: Colors.textColor,
    fontSize: 20,
    alignSelf:'center'
  },
  screenMargin: { marginTop: '5%'},
});

export default Home;
