import React from 'react'
import { TouchableHighlight, StyleSheet } from 'react-native'

export default class ListItem extends React.Component {

    constructor(props) {
        super(props)

        const item = {
            padding: 20,
            borderTopColor: '#22303f',
            borderTopWidth: this.props.index == 0 ? 0 : 1
        }

        this.state = {
            styles: StyleSheet.create({ item })
        }
    }

    render() {
        return (
            <TouchableHighlight 
                style={this.state.styles.item}
                onPress={this.props.onPress}
                onLongPress={this.props.onLongPress}
            >
                { this.props.children }
            </TouchableHighlight>
        )
    }
}