import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

export default class TextInputCustom extends React.Component {

  render() {
    return (
      <View>
        <TextInput 
          underlineColorAndroid="#fff" 
          selectionColor="#fff"
          placeholderTextColor="#fff"
          style={ styles.input }
          { ...this.props }
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 0,
    color: '#fff',
  },
});