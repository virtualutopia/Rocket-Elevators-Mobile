import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Modal, Button } from 'react-native';

const StartUpScreen = props => {
   return (
      <Modal visible={props.visible} animationType='slide'>
         <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/R2.png')} />
            <View >
               <TextInput
                  style={styles.input}
                  placeholder="Enter your Email"
                  // onChangeText={text => setState(prevState => {
                  //    return { ...prevState, s: text }
                  // })}
                  // onSubmitEditing={search}
                  // value={state.s} 
                  />
               <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  // onChangeText={text => setPass(prevState => {
                  //    return { ...prevState, s: text }
                  // })} 
                  />
               <Button title='LOG IN' onPress={props.login} />
            </View>
         </View>
      </Modal>
   )
};

export default StartUpScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
   HomeScreenContainer: {
      // flex: 1,
      alignItems: 'center',
      width: '80%',
      color: '#0b044a',
      fontSize: 300,
      fontWeight: "bold"
    },
    homeButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    logo: {
      padding: 10,
      width: 300,
      height: 100,
      // borderRadius: 10
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
    text: {
      color: '#aaa'
    }
})