import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

export default class Container extends React.Component {

  render() {
    return (
      <ScrollView>
        <View style={ styles.container }>
          { this.props.children }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  }
});