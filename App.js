import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Modal, Button, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

import ElevatorStatusChange from './components/elevatorStatusChange';
import LoginScreen from './components/login';
import Header from './components/header'
import color from './constants/colors'
import colors from './constants/colors';

export default function App() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isElevtorMode, setIsElevtorMode] = useState(false);
  const [nonOperationalElevators, setNonOperationalElevators] = useState('');
  const [selectedElevator, setSelectedElevator] = useState('');
  const [isElevatorSelected, setIsElevatorSelected] = useState(true);
  const [employeeList, setEmployeeList] = useState('');
  
  // for non-operational elevators
  const apiurlNonOperational = "https://restapirocketelevator.azurewebsites.net/api/elevator/Nonoperational";
  // PUT Request to cahnge an elevator's status to Active
  const apiurlChangeStatus = "https://localhost:5001/api/elevator/Nonoperational/";
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

  // const search = () => {
  //   axios(apiurlElevator).then(({ data }) => {
  //     let results = data

  //     console.log(results)
  //     setState(prevState => {
  //       return { ...prevState, results: results }
  //     })
  //   })
  // }
  const callNonOperational = () => {
    // Axios for nonoperational is working 
      axios.get(apiurlNonOperational)
      .then( ({ data }) => {
      // handle success
      let results = data
      setNonOperationalElevators(results);
      // console.log(nonOperationalElevators);
     })

    .catch(function (error) {
      // handle error
      console.log(error);
    })
    // let results = [{ "id": 1, "column_id": 1, "serial_number": 8305038634189, "model": "Excelium", "building_type": "Residential", "status": "Intervention", "date_service_since": "2019-11-12T00:00:00", "date_last_inspection": "2018-07-02T00:00:00", "inspection_certificate": "Yes", "information": "The Lord of the Eagles", "notes": "Aut iusto recusandae. Iste sapiente praesentium. Eligendi totam doloribus.", "created_at": "2020-04-09T20:39:42", "updated_at": "2020-04-09T20:39:42" }, { "id": 5, "column_id": 1, "serial_number": 9907042210184, "model": "Standard", "building_type": "Residential", "status": "Intervention", "date_service_since": "2018-06-22T00:00:00", "date_last_inspection": "2018-10-07T00:00:00", "inspection_certificate": "No", "information": "The Lord of the Eagles", "notes": "Et ad illo. Repellat sapiente laudantium. Dolorem in autem.", "created_at": "2020-04-09T20:39:43", "updated_at": "2020-04-09T20:39:43" }, { "id": 7, "column_id": 2, "serial_number": 6301048561183, "model": "Premium", "building_type": "Corporate", "status": "Intervention", "date_service_since": "2018-09-15T00:00:00", "date_last_inspection": "2019-06-01T00:00:00", "inspection_certificate": "No", "information": "Radagast", "notes": "Omnis laboriosam quas. Omnis voluptatem ipsa. Consectetur quo quia.", "created_at": "2020-04-09T20:39:43", "updated_at": "2020-04-09T20:39:43" }, { "id": 16, "column_id": 3, "serial_number": 7002216377084, "model": "Standard", "building_type": "Residential", "status": "Intervention", "date_service_since": "2019-12-28T00:00:00", "date_last_inspection": "2019-10-18T00:00:00", "inspection_certificate": "Yes", "information": "Bert", "notes": "Quia nihil veniam. Ab voluptatibus nemo. Reiciendis doloremque incidunt.", "created_at": "2020-04-09T20:39:44", "updated_at": "2020-04-09T20:39:44" }, { "id": 19, "column_id": 4, "serial_number": 8506273370088, "model": "Premium", "building_type": "Commercial", "status": "Intervention", "date_service_since": "2019-05-09T00:00:00", "date_last_inspection": "2018-05-20T00:00:00", "inspection_certificate": "Yes", "information": "Ori", "notes": "Id sed ut. Rem sed hic. Distinctio nesciunt consequuntur.", "created_at": "2020-04-09T20:39:44", "updated_at": "2020-04-09T20:39:44" }, { "id": 25, "column_id": 5, "serial_number": 6309151436085, "model": "Excelium", "building_type": "Hybrid", "status": "Intervention", "date_service_since": "2019-06-18T00:00:00", "date_last_inspection": "2019-03-26T00:00:00", "inspection_certificate": "No", "information": "Nori", "notes": "Aut quod nihil. Ea aut consectetur. Et ducimus consequatur.", "created_at": "2020-04-09T20:39:45", "updated_at": "2020-04-09T20:39:45" }, { "id": 26, "column_id": 5, "serial_number": 8611069676183, "model": "Standard", "building_type": "Hybrid", "status": "Intervention", "date_service_since": "2019-03-28T00:00:00", "date_last_inspection": "2019-04-01T00:00:00", "inspection_certificate": "Yes", "information": "Dori", "notes": "Repellendus iusto quisquam. Vel suscipit est. Adipisci culpa possimus.", "created_at": "2020-04-09T20:39:45", "updated_at": "2020-04-09T20:39:45" }, { "id": 29, "column_id": 5, "serial_number": 7401305905088, "model": "Premium", "building_type": "Hybrid", "status": "Intervention", "date_service_since": "2019-11-19T00:00:00", "date_last_inspection": "2018-10-04T00:00:00", "inspection_certificate": "Yes", "information": "The Necromancer", "notes": "Sed recusandae fuga. Fugiat natus veritatis. Cupiditate error sit.", "created_at": "2020-04-09T20:39:45", "updated_at": "2020-04-09T20:39:45" }, { "id": 31, "column_id": 6, "serial_number": 5605285495181, "model": "Premium", "building_type": "Residential", "status": "Intervention", "date_service_since": "2017-08-18T00:00:00", "date_last_inspection": "2018-12-15T00:00:00", "inspection_certificate": "Yes", "information": "Fili", "notes": "Fuga ut qui. Voluptate maxime fugiat. Nisi quasi sunt.", "created_at": "2020-04-09T20:39:45", "updated_at": "2020-04-09T20:39:45" }, { "id": 33, "column_id": 7, "serial_number": 7707204030186, "model": "Excelium", "building_type": "Hybrid", "status": "Intervention", "date_service_since": "2019-05-10T00:00:00", "date_last_inspection": "2019-10-12T00:00:00", "inspection_certificate": "Yes", "information": "Bungo Baggins", "notes": "Beatae ut alias. Velit tempora voluptatem. Id aut consectetur.", "created_at": "2020-04-09T20:39:45", "updated_at": "2020-04-09T20:39:45" }, { "id": 38, "column_id": 7, "serial_number": 9312035499086, "model": "Premium", "building_type": "Hybrid", "status": "Intervention", "date_service_since": "2019-04-24T00:00:00", "date_last_inspection": "2017-06-18T00:00:00", "inspection_certificate": "Yes", "information": "Golfimbul", "notes": "Sint ipsa maxime. Et sunt dignissimos. Tenetur quae eum.", "created_at": "2020-04-09T20:39:46", "updated_at": "2020-04-09T20:39:46" }, { "id": 39, "column_id": 7, "serial_number": 1083660082, "model": "Standard", "building_type": "Corporate", "status": "Intervention", "date_service_since": "2019-06-20T00:00:00", "date_last_inspection": "2018-09-15T00:00:00", "inspection_certificate": "No", "information": "Gloin", "notes": "Rerum et quaerat. Id omnis nam. Rerum sequi et.", "created_at": "2020-04-09T20:39:46", "updated_at": "2020-04-09T20:39:46" }, { "id": 41, "column_id": 8, "serial_number": 7601244547087, "model": "Excelium", "building_type": "Hybrid", "status": "Intervention", "date_service_since": "2019-11-14T00:00:00", "date_last_inspection": "2018-07-29T00:00:00", "inspection_certificate": "Yes", "information": "Tom", "notes": "Accusantium voluptatem est. Qui animi consectetur. In qui praesentium.", "created_at": "2020-04-09T20:39:46", "updated_at": "2020-04-09T20:39:46" }, { "id": 43, "column_id": 8, "serial_number": 6108124953188, "model": "Excelium", "building_type": "Residential", "status": "Intervention", "date_service_since": "2019-07-08T00:00:00", "date_last_inspection": "2019-03-20T00:00:00", "inspection_certificate": "No", "information": "Thorin Oakenshield", "notes": "Voluptate dolores delectus. Voluptas quia eos. Provident est ipsa.", "created_at": "2020-04-09T20:39:46", "updated_at": "2020-04-09T20:39:46" }, { "id": 45, "column_id": 9, "serial_number": 9803286338189, "model": "Standard", "building_type": "Hybrid", "status": "Intervention", "date_service_since": "2017-09-12T00:00:00", "date_last_inspection": "2019-12-31T00:00:00", "inspection_certificate": "No", "information": "Radagast", "notes": "Corrupti occaecati porro. Saepe voluptates et. Quaerat aut sapiente.", "created_at": "2020-04-09T20:39:46", "updated_at": "2020-04-09T20:39:46" }, { "id": 49, "column_id": 10, "serial_number": 5504126930086, "model": "Standard", "building_type": "Residential", "status": "Intervention", "date_service_since": "2019-05-12T00:00:00", "date_last_inspection": "2018-09-23T00:00:00", "inspection_certificate": "No", "information": "Radagast", "notes": "Quaerat ut maiores. Minus fuga voluptatum. Hic quisquam voluptas.", "created_at": "2020-04-09T20:39:47", "updated_at": "2020-04-09T20:39:47" }, { "id": 51, "column_id": 10, "serial_number": 110246060187, "model": "Excelium", "building_type": "Hybrid", "status": "Intervention", "date_service_since": "2018-10-22T00:00:00", "date_last_inspection": "2018-05-05T00:00:00", "inspection_certificate": "No", "information": "Tom", "notes": "Dolorem in incidunt. Autem provident sapiente. Odio et rerum.", "created_at": "2020-04-09T20:39:47", "updated_at": "2020-04-09T20:39:47" }, { "id": 58, "column_id": 11, "serial_number": 7703097170189, "model": "Standard", "building_type": "Hybrid", "status": "Intervention", "date_service_since": "2018-09-23T00:00:00", "date_last_inspection": "2019-12-29T00:00:00", "inspection_certificate": "Yes", "information": "Tom", "notes": "Animi voluptas omnis. Voluptatum rerum aut. Aut autem quisquam.", "created_at": "2020-04-09T20:39:47", "updated_at": "2020-04-09T20:39:47" }, { "id": 59, "column_id": 12, "serial_number": 7404108200087, "model": "Standard", "building_type": "Residential", "status": "Intervention", "date_service_since": "2017-08-13T00:00:00", "date_last_inspection": "2017-07-20T00:00:00", "inspection_certificate": "Yes", "information": "Kili", "notes": "Commodi exercitationem rerum. Officia aliquam voluptatum. Consectetur perspiciatis ea.", "created_at": "2020-04-09T20:39:48", "updated_at": "2020-04-09T20:39:48" }, { "id": 60, "column_id": 12, "serial_number": 9310264880182, "model": "Excelium", "building_type": "Hybrid", "status": "Intervention", "date_service_since": "2019-09-12T00:00:00", "date_last_inspection": "2019-09-09T00:00:00", "inspection_certificate": "No", "information": "Roac", "notes": "Praesentium voluptatum deleniti. Facere ea est. Quia sit fugiat.", "created_at": "2020-04-09T20:39:48", "updated_at": "2020-04-09T20:39:48" }, { "id": 63, "column_id": 12, "serial_number": 7306107652186, "model": "Premium", "building_type": "Corporate", "status": "Intervention", "date_service_since": "2018-08-17T00:00:00", "date_last_inspection": "2019-08-01T00:00:00", "inspection_certificate": "Yes", "information": "Oin", "notes": "Ratione non et. Repellat deleniti consequuntur. Veritatis impedit nobis.", "created_at": "2020-04-09T20:39:48", "updated_at": "2020-04-09T20:39:48" }, { "id": 65, "column_id": 12, "serial_number": 8302175073081, "model": "Standard", "building_type": "Residential", "status": "Intervention", "date_service_since": "2017-11-24T00:00:00", "date_last_inspection": "2019-09-30T00:00:00", "inspection_certificate": "Yes", "information": "Kili", "notes": "Dolores magnam pariatur. Earum quos impedit. Saepe temporibus modi.", "created_at": "2020-04-09T20:39:48", "updated_at": "2020-04-09T20:39:48" }, { "id": 66, "column_id": 12, "serial_number": 8405132575187, "model": "Excelium", "building_type": "Hybrid", "status": "Intervention", "date_service_since": "2019-10-29T00:00:00", "date_last_inspection": "2017-06-08T00:00:00", "inspection_certificate": "Yes", "information": "The Great Goblin", "notes": "Minima nobis quod. Sint illum qui. Quos sit accusamus.", "created_at": "2020-04-09T20:39:48", "updated_at": "2020-04-09T20:39:48" }, { "id": 69, "column_id": 13, "serial_number": 8303271096083, "model": "Premium", "building_type": "Residential", "status": "Intervention", "date_service_since": "2017-06-07T00:00:00", "date_last_inspection": "2017-07-07T00:00:00", "inspection_certificate": "No", "information": "Bilbo Baggins", "notes": "Eligendi ducimus vel. Eius magni atque. Quia vero quis.", "created_at": "2020-04-09T20:39:49", "updated_at": "2020-04-09T20:39:49" }]
    // setNonOperationalElevators(results);
    // console.log(nonOperationalElevators);
  }
  let employeeAPIData = [
    {
        "id": 1,
        "email": "admin@hotmail.com",
        "firstName": "Rosamaria",
        "lastName": "Jenkins",
        "encrypted_password": "$2a$11$2J120x7zsLOZBF5UbKNnTuo7pHGLOFGTAPNP3/i3DvjjbPCHkCjTi"
    },
    {
        "id": 2,
        "email": "asa.tremblay@example.com",
        "firstName": "Zelda",
        "lastName": "Friesen",
        "encrypted_password": "$2a$11$eyOS4FOthg.nqfFvSgtJcuYIJJZJ.4SunaXZlLlIVWDxw4JH8pWwG"
    },
    {
        "id": 3,
        "email": "norris.witting@example.org",
        "firstName": "Tamatha",
        "lastName": "Lemke",
        "encrypted_password": "$2a$11$mnKq0kCu9CW7f6JIMnqjgeQI6lzQO8c0EXS/x2KP8K6fLjWwbpqiK"
    },
    {
        "id": 4,
        "email": "susanna_predovic@example.com",
        "firstName": "Kristyn",
        "lastName": "Cremin",
        "encrypted_password": "$2a$11$qzyzphxLvsLqwvmyTqtKuOnO5v7s.nntuH6a1JY.vHlbkHqmULQ5O"
    },
    {
        "id": 5,
        "email": "elliott@example.org",
        "firstName": "Brock",
        "lastName": "Quigley",
        "encrypted_password": "$2a$11$dQ424QDsTgKIMGfgOWJhteHRFp.UHfpJrvDE19BU0eqrMpl3V08/K"
    },
    {
        "id": 6,
        "email": "georgeann@example.com",
        "firstName": "Callie",
        "lastName": "Johns",
        "encrypted_password": "$2a$11$Se.aFWWwr0OQpthLCLHYW..K3ynOXtpREYbyEBFiNFc925KF4Jh8a"
    },
    {
        "id": 7,
        "email": "lane.kreiger@example.net",
        "firstName": "Chuck",
        "lastName": "Cronin",
        "encrypted_password": "$2a$11$qWa4mzjPpKmFSh1/kLGaTuFhKHR5FF5wV1/vZ8pBUjHPlllKlIxtK"
    }]
  // let APIDataJson = APIData.json();

  // PUT Request to change Elevator Status into ACtive
  const changeStatus = (id) =>{}

  const callEmployeeList = () => {
    axios.get('https://restapirocketelevator.azurewebsites.net/api/employee')
    .then( ({ data }) => {
    // handle success
    let results = data
    let EmailList = results.map(employee => employee.email)
    console.log(EmailList);
    setEmployeeList(EmailList);
    // console.log(nonOperationalElevators);
   })

  .catch(function (error) {
    // handle error
    console.log(error);
  })
  }

  const enterHomeScreen = (email) => {
    console.log("entered Email: " + email)
    callEmployeeList()
    if (employeeList.includes(email.toString())) {
      // console.log(APIData);
      // console.log('APIData length= ' + APIData.length);
      // console.log('1st APIData: ');
      // console.log(APIData[0]);

      // console.log('APIData IDs: ');
      // console.log(APIDataId);
      callNonOperational()
      
      setIsLoginMode(false)
      setIsElevtorMode(false);

    }
  }
  // const leaveElevatorStatusScreen = () => {
  //   setIsElevtorMode(false);
  // };
  const selectElevatorHandler = (toWorkOnElevator) => {
    setSelectedElevator(toWorkOnElevator.id.toString());
    console.log("to work on Elevator: " + selectedElevator);
    setIsElevatorSelected(!isElevatorSelected);
  }
  const openStatusChangeView = (elevator) =>{
    setSelectedElevator(elevator);
    console.log("++++++++++  selected Elevator to work on : ");
    console.log(selectedElevator.id);
    setIsElevtorMode(true);
  }

  return (
    <View style={styles.container}>

      <LoginScreen visible={isLoginMode} login={enterHomeScreen} />
      <ElevatorStatusChange 
        visible={isElevtorMode} 
        elevator={selectedElevator} 
        Status={changeStatus}
        backHome={enterHomeScreen} />

      <Header title="Home Screen" />
      <View style={styles.elevatorsListcontainer}>
        <FlatList
          keyExractor={(item, index) => item.id}
          data={nonOperationalElevators}
          renderItem={itemData => (
            <TouchableOpacity onPress={() => openStatusChangeView(itemData.item)}>
              <View style={[styles.elevatorList, styles.isNotSelected]}>
              {/* <View style={[styles.elevatorList, isElevatorSelected? styles.isSelected : styles.isNotSelected]}> */}
                <Text style={styles.nonOperationalElevators} > elevator ID: {itemData.item.id.toString()}</Text>
                <Text style={styles.nonOperationalElevators}> Status: {itemData.item.status}</Text>
              </View>
            </TouchableOpacity>

          )}
        />
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
  elevatorsListcontainer: {
    flex: 5,
    marginTop: 10,
    // alignItems: 'center',
    // justifyContent: 'center'

  },
  elevatorList: {
    flexDirection: 'row',
    marginVertical: 5,
    height: 40,
    width: 300,
    // maxWidth: '90%',
    // paddingTop: 10,
    justifyContent: 'space-around', 
    // backgroundColor: colors.REblue,
    alignItems: 'center',
    borderRadius: 10,

  },
  isSelected: {
    backgroundColor: colors.REred,
  },
  isNotSelected: {
    backgroundColor: colors.REblue,
  },
  nonOperationalElevators: {
    fontSize: 16,
    fontWeight: '300',
    color: 'white'
  },
  homeButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    // justifyContent: 'flex-end',
    marginBottom: 35,
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