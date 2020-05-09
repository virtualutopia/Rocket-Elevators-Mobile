import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Modal, Button, TouchableOpacity } from 'react-native';
import Header from '../components/header';
import colors from '../constants/colors';
import axios from 'axios';



const ElevatorStatusChange = props => {

   const [currentStatus, setCurrentStatus] = useState(props.status);
   React.useEffect(() => {
      setCurrentStatus(props.status)
   }, []);
   const elevatorID = props.id.toString();
   console.log("currentStatus: " + currentStatus);

   const changeStatus = () => {
      // PUT Request to change Elevator Status into ACtive
      console.log("id: " + elevatorID);
      axios.put('https://restapirocketelevator.azurewebsites.net/api/elevator/Nonoperational/' + elevatorID)
         .then(function (response) {
            console.log(response);
         })
         .catch(function (error) {
            // console.log(error);
         })

      // PUT Request to get Elevator status after changing its status
      axios.get("https://restapirocketelevator.azurewebsites.net/api/elevator/" + elevatorID)
         .then(({ data }) => {
            // handle success
            let results = data
            setCurrentStatus(results.status);
            console.log("==================Currently Changed Elevator status ==================");
            console.log(results);
         })
         .catch(function (error) {
            // handle error
            console.log(error);
         });
   }
   // conditional Button - just available when the elevator status is Active
   let content = <Text></Text>;
   if (currentStatus === "Active") {
      content =
         <TouchableOpacity
            onPress={props.backHome}
            style={[styles.ButtonHome, (Platform.OS === 'ios') ? styles.ios : styles.android]}>
            <Text style={[styles.textButton, (Platform.OS === 'ios') ? styles.textios : styles.textAndroid]}>
            Return to elevators list</Text>
         </TouchableOpacity>;
   }
   // Condinal Button - for Change Status Button
   let content2 =
      <TouchableOpacity
         onPress={changeStatus}
         style={[styles.Button, { backgroundColor: colors.REgreen }, (Platform.OS === 'ios') ? styles.ios : styles.android]}>
         <Text style={[styles.textButton, (Platform.OS === 'ios') ? styles.textios : styles.textAndroid]}>
            CHANGE TO ACTIVE</Text>
      </TouchableOpacity>;
   if (currentStatus === "Active") {
      content2 = <Text></Text>;
   }
   return (
      <Modal visible={props.visible} animationType='slide'>
         <View style={styles.container}>
            <Header title="elevator Status Screen" />
            <View style={styles.textContainer}>
               <Text style={styles.text, {fontWeight : (Platform.OS === 'ios') ? '400' : '800'}}> 
                  Selected Elevator ID: {props.id} </Text>
               <Text style={[styles.text, (currentStatus === "Active") ? styles.activeElevator : styles.nonActiveElevator]}>
                  Current Status : {currentStatus}
               </Text>
               <Text></Text>
               <Text></Text>
               {content}
            </View>
            <View style={styles.elevatorButtonContainer}>
               {content2}
               <TouchableOpacity
                  onPress={props.backHome}
                  style={[styles.Button, { backgroundColor: colors.REblue }, (Platform.OS === 'ios') ? styles.ios : styles.android]}>
                  <Text style={[styles.textButton, (Platform.OS === 'ios') ? styles.textios : styles.textAndroid]}>
                     BACK</Text>
               </TouchableOpacity>
            </View>
         </View>
      </Modal>
   )
};

export default ElevatorStatusChange;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      // marginTop: 40,
   },

   textContainer: {
      flex: 2,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      shadowOpacity: 0.26,
      backgroundColor: 'white',
      elevation: 5,
      padding: 20,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 60,
   },
   text: {
      fontSize: 20,
      fontWeight: '600',
      margin: 10,
   },
   elevatorButtonContainer: {
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
      color: '#0b044a',
      fontSize: 300,
      fontWeight: "bold",
      justifyContent: 'flex-end',
      marginBottom: 40,

   },
   activeElevator: {
      color: colors.REgreen,

   },
   nonActiveElevator: {
      color: colors.REred
   },
   Button: {
      borderRadius: 10,
      width: '80%',
      height: '15%',
      alignItems: 'center',
      justifyContent: 'center',
   },
   ButtonHome: {
      borderRadius: 10,
      width: 250,
      height: '25%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.REred
   },
   ios: {
      marginTop: 5,
   },
   android: {
      marginTop: 5,
   },
   textButton: {
      fontSize: 20,
      color: 'white',
   },
   textAndroid: {
      fontWeight: '600',
   },
   textios: {
      fontWeight: '300',
   }
})