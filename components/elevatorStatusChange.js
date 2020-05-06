import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Modal, Button } from 'react-native';

const ElevatorStatusChange = props => {
   return (
      <Modal visible={props.visible} animationType='slide'>
         <View style={styles.container}>
            <View style={styles.elevatorScreenContainer}>
               <Text> elevator Status Screen </Text>
               <View style={styles.elevatorButtonContainer}>
                  <Button title="CHANGE STATUS TO ACTIVE" color='green' />
                  <Button title="HOME" onPress={props.backHome} />
                  {/* <Button title="HOME" onPress={() => setIsElevtorMode(false)}/> */}
                  {/* <Button title="LOG OUT" onPress={() => setIsLoginMode(true)}/> */}
               </View>
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
      justifyContent: 'space-evenly',
   },
   elevatorScreenContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
      color: '#0b044a',
      fontSize: 300,
      fontWeight: "bold"
    },
    elevatorButtonContainer: {
      width: '90%',
      justifyContent: 'space-between'
    } 
})