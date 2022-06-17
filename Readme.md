- Project Setup
    1) First clone the project with github HTTP link which is as follows in the terminal:
        git clone https://github.com/ios-sagar/WeatherAssignment.git 
    
    2) After successfully cloning the project, open terminal and redirect to project's local path and enter the following command:
        npm install

    3) For iOS specific users, you would required to redirect to ios folder inside the cloned project and enter the following command in the terminal:
        pod install 
    
    4) After completing the above steps, you can run the project with following commands in the terminal:
        i.  npm start  (To start the server)
        ii. react-native run-android or react-native run-ios  (Open new terminal window and type one of the command)
        iii. If you have Xcode installed in your Mac machine, then open the file with the extension .xcworkspace inside the ios folder.
        
    5) If you get directory path related error while building the android project, then you will have to follow the following steps:
        i. create a file inside android folder named as local.properties and paste the following:
            sdk.dir = /Users/USERNAME_Machine/Library/Android/sdk  (for ios)
                NOTE: Look for the slashes(/ or \\) depending upon your OS. 


- How to use the App
    1) After installing the app, once the app is opened, you will see a Search field where you can type city name to get the weather forecast for next 5 days;
    2) After pressing Search button, the result of 5 days will be displayed below the Search Field.
    3) For each day, only 1 record will be displayed.


- Technical Description
    1) React Navigation v6 is used as a wrapper around the app.
    2) After the user search's the city, Geolocation API will fetch latitude and longitude of the city and will provide these parameteres to the 5 day weather forecast API which will fetch us the weather forecast for the next 5 days for every 3 hours.
    3) The app filters the data to show only 1 weather forecast per day by comparing the dates till the last day of the response.
    4) The app is working on both android and ios along with horizontal screen orientation.
    5) Pull down to refresh is also implemented.
    6) Because we had the restriction of showing only one record per day, the lazy load functionality wasn't implemented. 


- APIs used
    1) https://api.openweathermap.org/geo/1.0/direct?q={city name}&appid={API key}
    2) https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}