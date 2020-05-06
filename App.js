import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Modal, Button } from 'react-native';
import axios from 'axios';

import ElevatorStatusChange from './components/elevatorStatusChange';
import StartUpScreen from './components/login';

export default function App() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isElevtorMode, setIsElevtorMode] = useState(false);
  const apiurlElevator = "https://restapirocketelevator.azurewebsites.net/api/intervention";
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });
  const [pass, setPass] = useState({
    s: "",
    results: [],
    selected: {}
  });

  const search = () => {
    axios(apiurlElevator).then(({ data }) => {
      let results = data

      console.log(results)
      setState(prevState => {
        return { ...prevState, results: results }
      })
    })
  }
  const enterHomeScreen = () => {
    if (true) {
      setIsLoginMode(false)

    }
  }
  const leaveElevatorStatusScreen = () => {
    setIsElevtorMode(false);
  };

  return (
    <View style={styles.container}>

      <StartUpScreen visible={isLoginMode} login={enterHomeScreen} />
      <ElevatorStatusChange visible={isElevtorMode} backHome={leaveElevatorStatusScreen} />

      <View style={styles.HomeScreenContainer}>
        <Text style={styles.title}> Home Screen </Text>

      </View>
      <View style={styles.elevatorsList}>

      </View>
      <View style={styles.homeButtonContainer}>
        <Button title="SELECT" color='#28a745' onPress={() => setIsElevtorMode(true)} />
        <Button title="LOG OUT" color='#dc3545' onPress={() => setIsLoginMode(true)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    
    
  },
  HomeScreenContainer: {
    // flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    height: 80,
    backgroundColor: '#ffc107',
    marginTop: 20,
    // backgroundColor: '#ffc107',
    // height: 60,
    // alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    marginLeft: '25%',   
    color: '#F3F3F3',
    fontSize: 25,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  elevatorsList: {
    flex: 5,
  },
  homeButtonContainer: {
    flex: 1,
    justifyContent: 'space-around',
    // justifyContent: 'flex-end',
    marginBottom: 100,
    width: '80%'
    
  }
});


// Colors
// $blue:    #007bff !default; // primary
// $indigo:  #6610f2 !default;
// $purple:  #6f42c1 !default;
// $pink:    #e83e8c !default;
// $red:     #dc3545 !default; // danger
// $orange:  #fd7e14 !default;
// $yellow:  #ffc107 !default; // warning
// $green:   #28a745 !default; // success
// $teal:    #20c997 !default;
// $cyan:    #17a2b8 !default; // info

// // Grays
// $white:    #fff !default;
// $gray-100: #f8f9fa !default; // light
// $gray-200: #e9ecef !default;
// $gray-300: #dee2e6 !default;
// $gray-400: #ced4da !default;
// $gray-500: #adb5bd !default;
// $gray-600: #868e96 !default; // secondary
// $gray-700: #495057 !default;
// $gray-800: #343a40 !default; // dark
// $gray-900: #212529 !default;
// $black:    #000 !default;


// onChangeText={goalInputHandler}
// value={enteredGoal} 
// placeholder="Enter your password"

// onChangeText={goalInputHandler}
// value={enteredGoal} 
{/* <View>
              {state.results.map( result => {
                <View key={result.id}>
                  <Text> style{styles.text}>{result.status} </Text>
                </View>
              })
              }
            </View> */}