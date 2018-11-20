import React from 'react';
import { StyleSheet, Button, View } from 'react-native';

export default class ButtonCustom extends React.Component {
  constructor(props) {
    super(props)

    this.statusColor = this.statusColor.bind(this)

    this.state = {
      style:  this.statusColor(),
    }
  }

  statusColor() {

    const status = {
      error: '#e74c3c',
      warning: '#f39c12',
      success: '#2ecc71',
      notification: '#fb1751',
    }

    return status[this.props.status ? this.props.status : 'notification']
  }

  render() {
    return (
      <View style={styles.view}>
        <Button
          color={this.state.style}
          { ...this.props }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    marginTop: 25
  }
});
 