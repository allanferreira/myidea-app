import React from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import AddButton from '../components/AddButton'
import Container from '../components/Container'
import ListItem from '../components/ListItem'
import PubSub from 'pubsub-js'
import api from '../services/api'

export default class Pitches extends React.Component {

    static navigationOptions = { 
        title: 'Pitches',
        headerLeft: null,
    }

    subscriptions = [
        PubSub.subscribe('PITCHES', () => {
            api
                .getPitches(this.state.user)
                .then(pitches => this.setState({ pitches }))
        })
    ]

    constructor(props) {
        super(props)
        this.state = {
            user: {
                api_token: this.props.navigation.getParam('api_token'),
            },
            pitches: [],
        }
    }

    componentWillMount() {
        api
            .getPitches(this.state.user)
            .then(pitches => this.setState({ pitches }))
    }

    goToAdd() {
        this.props.navigation.push('PitchAdd', {
            api_token: this.state.user.api_token,
        })
    }

    goToPitch(pitch) {
        this.props.navigation.push('Pitch', {
            api_token: this.state.user.api_token,
            pitch_id: pitch.id,
        })
    }

    goToPitchEdit(pitch) {
        this.props.navigation.push('PitchEdit', {
            api_token: this.state.user.api_token,
            pitch_id: pitch.id,
        })
    }

    render() {
        return (
            <View style={styles.view}>
                <AddButton
                    onPress={this.goToAdd.bind(this)}
                />
                <Container>
                    <ScrollView>
                        { this.state.pitches.map((pitch, index) => 
                            <ListItem 
                                key={ index } 
                                index={ index }
                                onLongPress={this.goToPitchEdit.bind(this, pitch)} 
                                onPress={this.goToPitch.bind(this, pitch)} 
                            >
                                <Text style={styles.text}>{ pitch.subject }</Text>
                            </ListItem>
                        ) }
                    </ScrollView>
                </Container>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        height: '100%'
    },
    text: {
        color: '#fff',
    }
})