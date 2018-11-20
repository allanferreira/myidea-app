import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'

export default class AddButton extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <TouchableHighlight
              style={styles.button}
              {...this.props}
            >
              <Text style={styles.text}>+</Text>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fb1751',
    paddingLeft: 15,
    paddingRight: 15,
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 30,
    right: 30,
    borderRadius: 60,
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '100',
    fontSize: 30,
    lineHeight: 36,
  }
})