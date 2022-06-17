import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Image, ScrollView, RefreshControl, Alert} from 'react-native';
import axios from 'axios';

import EnvVariable from '../constant/EnvVariable';

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October", "November", "December"];

const WeatherView = props => {
  const [weatherResponse, setWeatherResponse] = useState(undefined); //State variables to store the response of Weather API
  const [refreshing, setRefreshing] = useState(false); //State variables for refrshing data for pull to refresh

  let filteredData = {list:[]}

  // function to change date to dayDate, month and date fomrat to show on the UI
  const readableDateConversion=(index)=>{
    var dayName = days[new Date(filteredData.list[index].dt_txt.split(" ")[0]).getDay()];
    var month=months[new Date(filteredData.list[index].dt_txt.split(" ")[0]).getMonth()];
    var date=new Date(filteredData.list[index].dt_txt.split(" ")[0]).getDate();
    var dayDate=dayName+", "+month+" "+date;
    filteredData.list[index].dt_txt=dayDate;
  }

  const fetchWeatherData=()=>{
    let webApiUrl=EnvVariable.API_WEATHER +props.lat +'&lon=' +props.lon +'&appid=' +EnvVariable.API_KEY;
    
    // API Call to weather forecast starts
      axios.get(webApiUrl).then(res => {
        let lastDateOnly = res.data.list[res.data.list.length - 1].dt_txt.split(" ")
        var todayDate = new Date().toISOString().slice(0, 10);    
        const d1 = new Date(todayDate);
        const d2 = new Date(lastDateOnly[0]);
        var rangeDates = getDatesInRange(d1, d2) //Get the array of dates between today & the last day from the API
        let i,j;

        for(i = 0; i < rangeDates.length; i++){
            for(j = 0; j < res.data.list.length; j++){
              // If the array date matches with the date from the forecast API, filter the date to fetch only one row per day 
                if(rangeDates[i] == res.data.list[j].dt_txt.split(" ")[0]) {
                    if(i == 0){
                        filteredData.list[0] =  res.data.list[j]; 
                        readableDateConversion(0); 
                    }
                    else{
                        filteredData.list[i] =  res.data.list[j];
                        readableDateConversion(i);
                    }
                    break;
                }
            }
        }
        setWeatherResponse(filteredData);
      })
      .catch(error => {
        if (error == "TypeError: Network request failed") {
          Alert.alert('Oops!','Please check you network.',
              [{ text: 'OK' }],{ cancelable: false },
          );
      } else {
          Alert.alert('Oops','Request failed, Please try again!',
              [{ text: 'OK' }],{ cancelable: false },
          );
      }
      });
      // API Call ends
      setRefreshing(false)
  }

  useEffect(() => {
     fetchWeatherData();
  }, [props.lat, props.lan]);


  // To get date range starting from today to the last day from the forecast API function starts
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


const onRefresh = React.useCallback(() => {
  setRefreshing(true);
  fetchWeatherData();
}, [props.lat, props.lon]);


  return (
    //  Weather View starts
    <ScrollView refreshControl={<RefreshControl  refreshing={refreshing} onRefresh={onRefresh}/>} showsVerticalScrollIndicator={false} >
      <View  style={styles.mainView}>
        {weatherResponse != undefined || weatherResponse != null
          ? weatherResponse.list.map((value, index) => (
              <View key={index}>
                {/* Weather view UI starts */}
                <View style={styles.dateParentView}>
                  <Text style={styles.dateView}>{value.dt_txt}</Text>
                </View>
                {value.weather.map(res => (
                  <View style={styles.flexView}>
                    <View>
                      <Text style={styles.textHeading}>{res.main}</Text>
                      <Text>{res.description}</Text>
                    </View>
                    {/* custom weather images have been used as icons fetched from the API were not rendering */}
                    <View style={{justifyContent:'center'}}>{res.main=='Clouds'?(<Image source={require('../assets/cloud.png')} resizeMode='contain' style={{width:35, height:35}} />):res.main=='Rain'?(<Image source={require('../assets/rain.png')} resizeMode='contain' style={{width:35, height:35}}/>):res.main=='Clear'?(<Image source={require('../assets/sun.png')} resizeMode='contain' style={{width:35, height:35}}/>):(<ActivityIndicator/>)}</View>
                  </View>
                ))}

              </View>
            ))  
          : null}
      </View>
    </ScrollView>
    // Weather View Ends
  );
};

const styles = StyleSheet.create({
  mainView: {justifyContent: 'space-around', width: '100%', marginTop: 20},
  dateView: { fontWeight: 'bold', color:'white', textAlignVertical:'center', marginLeft: 5},
  flexView: {flexDirection: 'row', justifyContent: 'space-between', marginBottom:20, marginLeft: 8, marginRight: 8},
  textHeading: {fontWeight: 'bold', fontSize: 16, marginBottom: 5},
  dateParentView:{ marginBottom: 10, backgroundColor: 'grey', paddingTop: 5, paddingBottom: 5 }
});

export default WeatherView;
