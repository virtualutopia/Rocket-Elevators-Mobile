import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Modal, Button } from 'react-native';
import Header from '../components/header';
import colors from '../constants/colors';
import axios from 'axios';



const ElevatorStatusChange = props => {
   const [currentStatus, setCurrentStatus] = useState(props.status);
   React.useEffect(() => {
      setCurrentStatus(props.status)
   }, []);
   const elevatorID = props.id.toString();

   
   const changeStatus = () => {
      // PUT Request to change Elevator Status into ACtive
      axios.put('https://restapirocketelevator.azurewebsites.net/api/elevator/Nonoperational/' + elevatorID)
         .then(function (response) {
            console.log(response);
         })
         .catch(function (error) {
            console.log(error);
         })

      // PUT Request to get Elevator status after changing its status
      axios.get("https://restapirocketelevator.azurewebsites.net/api/elevator/" + elevatorID)
         .then(({ data }) => {
            // handle success
            let results = data
            setCurrentStatus(results.status);
         })
         .catch(function (error) {
            // handle error
            console.log(error);
         });
   }
   // conditional Button - just available when the elevator status is Active
   let content = <Text></Text>;
   if (currentStatus === "Active") {
      content = <Button title="Return to elevators list" onPress={props.backHome} />;
   }
   return (
      <Modal visible={props.visible} animationType='slide'>
         <View style={styles.container}>
            <Header title="elevator Status Screen" />
            <View style={styles.textContainer}>
               <Text style={styles.text}> Selected Elevator ID: {props.id} </Text>
               <Text style={[styles.text, (currentStatus === "Active") ? styles.activeElevator : styles.nonActiveElevator]}>
                  Current Status : {currentStatus}
               </Text>
               <Text></Text>
               <Text></Text>
               {content}
            </View>
            <View style={styles.elevatorButtonContainer}>
               <Button title="CHANGE STATUS TO ACTIVE" onPress={changeStatus} />
               <Button title="BACK" onPress={props.backHome} />
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
   }
})