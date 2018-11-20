import React from 'react'
import { StyleSheet } from 'react-native'
import Container from '../components/Container'
import ButtonCustom from '../components/ButtonCustom'
import TextInputCustom from '../components/TextInputCustom'
import Alert from '../components/Alert'
import PubSub from 'pubsub-js'
import api from '../services/api'

export default class PitchAdd extends React.Component {

    static navigationOptions = { 
        title: 'Add a Pitch',
    }

    constructor(props) {
        super(props)
        this.state = {
			message: '',
			buttonDisabled: false,
            user: {
                api_token: this.props.navigation.getParam('api_token'),
            },
            pitch: {
				subject: '',
				text: '',
			},
        }
    }

	inputHandler(key, value) {
		this.setState({ 
			pitch: { 
				...this.state.pitch,
				[key]: value,
			} 
		})
	}

	addHandler() {
		this.setState({ buttonDisabled: true })
		api
			.addPitch({
				...this.state.user,
				...this.state.pitch,
			})
			.then(pitch => {
				this.setState({ message: 'Added successfully' })
				PubSub.publish('PITCHES')
			})
			.catch(error => console.log(error))
			.then(result => this.setState({ 
				buttonDisabled: false,
				pitch: {
					subject: '',
					text: '',
				}
			}))
	}

    render() {
        return (
            <Container>
				<Alert 
					status='success' 
					value={ this.state.message }
				/>
				<TextInputCustom 
					placeholder="Subject"
					value={ this.state.pitch.subject } 
					onChangeText={ this.inputHandler.bind(this, 'subject') }
					maxLength={30}
				/>
				<TextInputCustom 
					placeholder="Text"
					value={ `${this.state.pitch.text}` } 
					onChangeText={ this.inputHandler.bind(this, 'text') }
					multiline={true}
					numberOfLines={5}
				/>
				<ButtonCustom 
					title="Add"
					status="success" 
					disabled={ this.state.buttonDisabled }
					onPress={ this.addHandler.bind(this) }
				/>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        color: '#fff',
    }
})