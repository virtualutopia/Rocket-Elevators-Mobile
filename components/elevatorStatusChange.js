import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Modal, Button } from 'react-native';
import Header from '../components/header';
import colors from '../constants/colors';
import axios from 'axios';

const ElevatorStatusChange = props => {
   console.log("Elevator ID:" + props.elevator.id)
   console.log("this Elevator status :" + props.elevator.status)
   const [currentStatus, setCurrentStatus] = useState(props.elevator.status);
   React.useEffect(()=> {
      setCurrentStatus(props.elevator.status)
      },[])
   const elevatorID = props.elevator.id
   console.log("currentStatus: " + currentStatus)
   // const currentStatus = props.elevator.status;

   // PUT Request to change Elevator Status into ACtive
   // const url = 'https://localhost:5001/api/elevator/Nonoperational/' + props.elevator.id.toString()
   const APIPuturl = 'https://restapirocketelevator.azurewebsites.net/api/elevator/Nonoperational/' //+ elevatorID.toString()

   const changeStatus = () => {

      console.log("url is : ")
      console.log(APIPuturl)
      axios.put(APIPuturl)
         .then(function (response) {
            console.log(response);
         })
         .catch(function (error) {
            console.log(error);
         })

          // Axios for nonoperational is working 
      axios.get("https://restapirocketelevator.azurewebsites.net/api/elevator/" )//+ elevatorID.toString())
      .then( ({ data }) => {
      // handle success
      let results = data

      console.log("==================Currently Changes Elevator ==================");
      console.log(results);
      setCurrentStatus(results.status);
      })

      .catch(function (error) {
      // handle error
      console.log(error);
      });
   }
   return (
      <Modal visible={props.visible} animationType='slide'>
         <View style={styles.container}>
            <Header title="elevator Status Screen" />
            <View style={styles.textContainer}>
               <Text style={styles.text}> Selected Elevator ID: {props.elevator.id} </Text>
               <Text style={[styles.text, (currentStatus === "Active") ? styles.activeElevator : styles.nonActiveElevator]}>
                  This elevator is : {currentStatus} 
               </Text>
            </View>
            <View style={styles.elevatorButtonContainer}>
               <Button title="CHANGE STATUS TO ACTIVE" color='green' onPress={changeStatus} />
               <Button title="HOME" onPress={props.backHome} />
            </View>
         </View>
      </Modal>
   )
};
// color=colors.REblue : color=colors.REred
export default ElevatorStatusChange;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      // marginTop: 40,
   },

   textContainer:{
      flex: 1,
      shadowColor: 'black',
      shadowOffset: {width: 0, height:2},
      shadowRadius: 6,
      shadowOpacity: 0.26,
      backgroundColor: 'white',
      elevation: 5,
      padding: 20,
      borderRadius: 10,
      justifyContent: 'center',
      marginTop: 60,
   },
   text:{
      fontSize: 20,
      fontWeight: '400',
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
      color: colors.REblue
   },
   nonActiveElevator: {
      color: colors.REred
   }
})