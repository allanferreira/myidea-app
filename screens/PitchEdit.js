import React from 'react'
import { Text, StyleSheet } from 'react-native'
import Container from '../components/Container'
import ButtonCustom from '../components/ButtonCustom'
import TextInputCustom from '../components/TextInputCustom'
import Alert from '../components/Alert'
import PubSub from 'pubsub-js'
import api from '../services/api'

export default class PitchEdit extends React.Component {

    static navigationOptions = { 
		title: 'Pitch Edit'	
	}

    constructor(props) {
        super(props)
        this.state = {
			message: '',
			buttonDisabled: false,
            user: {
                api_token: this.props.navigation.getParam('api_token'),
            },
            pitch: {},
        }
	}

    componentWillMount() {
        api
            .getPitch({
              ...this.state.user, 
              pitch_id: this.props.navigation.getParam('pitch_id'),
            })
            .then(pitch => this.setState({ pitch }))
    }

	inputHandler(key, value) {
		this.setState({ 
			pitch: { 
				...this.state.pitch,
				[key]: value,
			} 
		})
	}

	deleteHandler() {
		const pitch_id = this.props.navigation.getParam('pitch_id')

		api
			.destroyPitch({
				...this.state.user,
				pitch_id 
			})
			.then(res => {
				PubSub.publish('PITCHES')
				this.setState({ message: 'Pitch has deleted'})
				setTimeout(()=> this.props.navigation.push('Pitches', this.state.user), 3000)
			})
			.catch(err => console.log(JSON.stringify(err)))

	}

	editHandler() {
		this.setState({ buttonDisabled: true })
		api
			.updatePitch({
				...this.state.user,
				...this.state.pitch
			})
			.then(res => {
				PubSub.publish('PITCHES')
				this.setState({ message: 'Edited successfully' })
			})
			.catch(error => console.log(error))
			.then(result => this.setState({ 
				buttonDisabled: false
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
					value={ `${this.state.pitch.subject}` } 
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
					title="Edit"
					status="success" 
					disabled={ this.state.buttonDisabled }
					onPress={ this.editHandler.bind(this) }
				/>
				<Text style={ styles.or }>or</Text>
				<ButtonCustom 
					title="Delete"
					status="error"
					onPress={ this.deleteHandler.bind(this) }
				/>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        color: '#fff',
	},
	or: {
		color: '#fff',
		marginTop: 20,
		textAlign: 'center',
	}
})