import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors'

const Header = (props) => {
   return (
      <View style={styles.headerContainer}>
         <Text style={styles.title}> {props.title} </Text>
      </View>
   );
}

export default Header;
const styles = StyleSheet.create({
   headerContainer: {
      width: '100%',
      height: 80,
      backgroundColor: colors.REred,
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
   },
   title: {
      color: '#F3F3F3',
      fontSize: 20,
      fontWeight: '800',
      textTransform: 'uppercase'
   },
})