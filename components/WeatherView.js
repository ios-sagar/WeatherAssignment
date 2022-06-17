import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Image} from 'react-native';
import axios from 'axios';

import EnvVariable from '../constant/EnvVariable';

var days = ["Sunday", "Monay", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October", "November", "December"];

const WeatherView = props => {
  const [weatherResponse, setWeatherResponse] = useState(undefined);
  let filteredData = {list:[]}

  useEffect(() => {
    let webApiUrl=EnvVariable.API_WEATHER +props.lat +'&lon=' +props.lon +'&appid=' +EnvVariable.API_KEY;
    
    // API Call starts
      axios.get(webApiUrl).then(res => {
        
        let lastDateOnly = res.data.list[res.data.list.length - 1].dt_txt.split(" ")
        var todayDate = new Date().toISOString().slice(0, 10);    
        const d1 = new Date(todayDate);
        const d2 = new Date(lastDateOnly[0]);
        var rangeDates = getDatesInRange(d1, d2)
        let i,j;
        // Filtering data one per day starts
        for(i = 0; i < rangeDates.length; i++){
            for(j = 0; j < res.data.list.length; j++){
              // Filtering the data whenever it matches
                if(rangeDates[i] == res.data.list[j].dt_txt.split(" ")[0]) {
                    if(i == 0){
                        filteredData.list[0] =  res.data.list[j]; 
                        // Changing date to dayDate, month and date format starts 
                        var dayName = days[new Date(filteredData.list[0].dt_txt.split(" ")[0]).getDay()];
                        var month=months[new Date(filteredData.list[0].dt_txt.split(" ")[0]).getMonth()];
                        var date=new Date(filteredData.list[0].dt_txt.split(" ")[0]).getDate();
                        var dayDate=dayName+", "+month+" "+date;
                        filteredData.list[0].dt_txt=dayDate;
                        // Changing date to dayDate, month and date format ends
                    }
                    else{
                        filteredData.list[i] =  res.data.list[j];
                        // Changing date to dayDate, month and date format starts 
                        var dayName = days[new Date(filteredData.list[i].dt_txt.split(" ")[0]).getDay()];
                        var month=months[new Date(filteredData.list[i].dt_txt.split(" ")[0]).getMonth()];
                        var date=new Date(filteredData.list[i].dt_txt.split(" ")[0]).getDate();
                        var dayDate=dayName+", "+month+" "+date;
                        filteredData.list[i].dt_txt=dayDate;
                        // Changing date to dayDate, month and date format ends
                    }
                    break;
                }
            }
        }
        // Filter data one per day ends
        setWeatherResponse(filteredData);
      })
      .catch(err => {
        console.log(err);
      });
      // API Call ends 
  }, [props.lat, props.lan]);


  // To get date range function starts
  function getDatesInRange(startDate, endDate) {
    const date = new Date(startDate.getTime());
    const dates = [];
    while (date <= endDate) {
      dates.push(new Date(date).toISOString().split('T')[0]);
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }
// To get date range function ends 


  return (
    //    Weather View starts
    <View style={styles.mainView}>
      {weatherResponse != undefined || weatherResponse != null
        ? weatherResponse.list.map(value => (
            <View key={value.dt}>
              <Text style={styles.dateView}>{value.dt_txt}</Text>

              {/* flex view starts */}
              {value.weather.map(res => (
                <View style={styles.flexView}>
                  <View>
                    <Text style={styles.textHeading}>{res.main}</Text>
                    <Text>{res.description}</Text>
                    {/* <Text>{weatherResponse}</Text> */}
                  </View>
                  <View style={{justifyContent:'center'}}>{res.main=='Clouds'?(<Image source={require('../assets/cloud.png')} resizeMode='contain' style={{width:35, height:35}} />):res.main=='Rain'?(<Image source={require('../assets/rain.png')} resizeMode='contain' style={{width:35, height:35}}/>):res.main=='Clear'?(<Image source={require('../assets/sun.png')} resizeMode='contain' style={{width:35, height:35}}/>):(<ActivityIndicator/>)}</View>
                </View>
              ))}
              {/* flex view Ends */}
            </View>
          ))
        : null}
    </View>
    // Weather View Ends
  );
};

const styles = StyleSheet.create({
  mainView: {justifyContent: 'space-around', width: '100%', marginTop: 20},
  dateView: {backgroundColor: 'grey', fontWeight: 'bold', marginBottom: 10, paddingHorizontal:5, color:'white', height:25,textAlignVertical:'center'},
  flexView: {flexDirection: 'row', justifyContent: 'space-between', marginBottom:20},
  textHeading: {fontWeight: 'bold', fontSize: 16, marginBottom: 5},
});

export default WeatherView;
