import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Alert extends React.Component {

  constructor(props) {
    super(props)

    this.statusColor = this.statusColor.bind(this)

    this.state = {
      base: StyleSheet.create({
        display: {
          display: 'none'
        }
      }),
      styles: {
        status: StyleSheet.create(this.statusColor()),
      }
    }
  }

  componentWillReceiveProps(props) {
    
    let css = {}
    css.display = props.value ? { display: 'flex' } : { display: 'none' }
    
    this.setState({
      base: StyleSheet.create({ ...css })
    })

  }

  statusColor() {

    const status = {
      error: {
        view: { backgroundColor: '#e74c3c', padding: 10 },
        text: { color: '#c0392b' }
      },
      warning: {
        view: { backgroundColor: '#f39c12', padding: 10 },
        text: { color: '#ce840f' }
      },
      success: {
        view: { backgroundColor: '#2ecc71', padding: 10 },
        text: { color: '#27ae60' }
      },
      notification: {
        view: { backgroundColor: '#3498db', padding: 10 },
        text: { color: '#2980b9' }
      }
    }

    return status[this.props.status ? this.props.status : 'notification']
  }

  render() {
    return (
      <View style={ this.state.base.display } >
        <View style={ this.state.styles.status.view } >
          <Text style={ this.state.styles.status.text }>
            { this.props.value }
          </Text>
        </View>
      </View>
    )
  }
}