import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

const WeatherView = () => {
  return (
    //    Weather View starts
    <View style={styles.mainView}>
      <Text style={styles.dateView}>Thursday, July 2021</Text>

      {/* flex view starts */}
      <View style={styles.flexView}>
        <View>
          <Text style={styles.textHeading}>Clear</Text>
          <Text>Clear sky</Text>
        </View>
        <ActivityIndicator />
      </View>
      {/* flex view Ends */}
    </View>
    // Weather View Ends
  );
};

const styles = StyleSheet.create({
  mainView: {justifyContent: 'space-around', width: '100%', marginTop: 20},
  dateView: {backgroundColor: 'grey', fontWeight: 'bold', marginBottom: 10},
  flexView: {flexDirection: 'row', justifyContent: 'space-between'},
  textHeading: {fontWeight: 'bold', fontSize: 16, marginBottom: 5},
});

export default WeatherView;
