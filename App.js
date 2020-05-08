import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Modal,
  Button,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import axios from 'axios';

import ElevatorStatusChange from './components/elevatorStatusChange';
import LoginScreen from './components/login';
import Header from './components/header'
import colors from './constants/colors';

// related to Flatlist of elevators at HomeScreen
function Item({ id, status, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id, status)}
      style={[
        styles.elevatorList,
        { backgroundColor: colors.REblue },
      ]}
    >
      <Text style={styles.nonOperationalElevators}>{id}---{status}</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isElevtorMode, setIsElevtorMode] = useState(false);
  const [nonOperationalElevators, setNonOperationalElevators] = useState('');
  const [selectedElevator, setSelectedElevator] = useState('');
  const [selectedElevatorId, setSelectedElevatorId] = useState('');
  const [selectedElevatorStatus, setSelectedElevatorStatus] = useState('');
  const [employeeList, setEmployeeList] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');

  // related to Flatlist of elevators at HomeScreen
  const [selected, setSelected] = React.useState(new Map());
  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));
      console.log("@@@@@@@@@@ @@@@@@@@@@ @@@@@@@@@@");
      console.log("@@@@@@@@@@ selected.get(id): @@@@@@@@@@" + id);
      console.log("@@@@@@@@@@ @@@@@@@@@@ @@@@@@@@@@");

      setSelected(newSelected);
      openStatusChangeViewWithId(id);
    },
    [selected],
  );

  // It Handls event After selecting an elevator from screen
  const openStatusChangeViewWithId = (id) => {
    setSelectedElevatorId(id);
    //Get Current Selected Elevator's Status from API
    axios.get("https://restapirocketelevator.azurewebsites.net/api/elevator/" + id.toString())
      .then(({ data }) => {
        // handle success
        let results = data
        setSelectedElevatorStatus(results.status);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    // change visibility of 3rd Screen (change status) to visible
    setIsElevtorMode(true);
  }

  // GET Request to get the list of Non-Operational elevators
  const callNonOperational = () => {
    axios.get("https://restapirocketelevator.azurewebsites.net/api/elevator/Nonoperational")
      .then(({ data }) => {
        // handle success
        let results = data
        setNonOperationalElevators(results);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  // GET Request to get the list of employees
  const callEmployeeList = () => {
    axios.get('https://restapirocketelevator.azurewebsites.net/api/employee')
      .then(({ data }) => {
        // handle success
        let results = data
        setEmployeeList(results);
        // console.log(nonOperationalElevators);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
  // Handles Login into Home Screen - Email check
  const enterHomeScreen = (email) => {
    callEmployeeList();
    let EmailList = [];
    if (employeeList == []) {
      setIsLoginMode(true);
    } else {
      employeeList.map((element) => {
        EmailList.push(element.email);
      });

      if (EmailList.includes(email)) {
        callNonOperational()
        setIsLoginMode(false)
      }
    }
  }

  const LogoutHandler = () => {
    console.log("logoutHandler is touched ***********")
    setIsLoginMode(true);
    setEnteredEmail('');
    setNonOperationalElevators('');
  }
  // Handles changing screen from 3rd Screen to Home Screen
  const backToHomeScreen = () => {
    setIsElevtorMode(false);
    callNonOperational()
  }
  const clickhandler = () => {
    enterHomeScreen();
    enterHomeScreen(enteredEmail);
  }
  return (
    <View style={styles.container}>

      <Modal visible={isLoginMode} animationType='slide'>
        <View style={styles.loginContainer}>
          <Image style={styles.logo} source={require('./assets/R2.png')} />
          <View >
            <TextInput
              style={styles.input}
              placeholder="Enter your Email"

              onChangeText={(text) => setEnteredEmail(text.toLowerCase())}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"

            />
            <Button title='LOG IN' onPress={clickhandler} />
          </View>
        </View>
      </Modal>

      <ElevatorStatusChange
        visible={isElevtorMode}
        id={selectedElevatorId}
        status={selectedElevatorStatus}

        backHome={backToHomeScreen} />

      <Header title="Home Screen" />

      <SafeAreaView style={styles.elevatorsListcontainer}>
        <FlatList
          data={nonOperationalElevators}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              status={item.status}
              selected={!!selected.get(item.id)}
              onSelect={onSelect}
            />
          )}
          keyExtractor={item => item.id}
          extraData={selected}
        />
      </SafeAreaView>

      <View style={styles.homeButtonContainer}>
        <Button title="SELECT" color='#28a745' onPress={() => setIsElevtorMode(true)} />
        <Button title="LOG OUT" color='#dc3545' onPress={LogoutHandler} />
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

  },
  elevatorList: {
    flexDirection: 'row',
    marginVertical: 5,
    height: 40,
    width: 300,

    justifyContent: 'space-around',
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
    fontWeight: '400',
    color: 'white'
  },
  homeButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 35,
    width: '80%'

  },
  loginContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  logo: {
    padding: 10,
    width: 300,
    height: 100,

  },
  input: {
    color: "#0b044a",
    width: 300,
    borderColor: "#0b044a",
    borderWidth: 2,
    padding: 10,
    margin: 10,
    borderRadius: 10
  },

});
