import React from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import Container from '../components/Container'
import ButtonCustom from '../components/ButtonCustom'
import api from '../services/api'
import watson from '../services/watson'

export default class Pitch extends React.Component {

    static navigationOptions = { 
        title: 'Pitch',
	}

    constructor(props) {
        super(props)
        this.state = {
			message: false,
            user: {
                api_token: this.props.navigation.getParam('api_token'),
            },
			pitch: {},
			review: {
				document_tone: {
					tones: []
				},
				sentences_tone: []
			}
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
	
	analyser() {
		this.setState({message: false})
		watson
			.analyser({
				text: this.state.pitch.text,
			})
			.then(res => {

				this.setState({ review: res.data })

				if(this.state.review.document_tone.tones.length == 0)
					this.setState({message: true})
			})
			.catch(err => console.log(JSON.stringify(err)))
	}

    render() {
        return (
            <Container>
				<ScrollView>
					<View style={styles.pitch}>
						<Text style={styles.text}>{ this.state.pitch.subject }</Text>
						<Text style={styles.text}>{ this.state.pitch.text }</Text>
					</View>
					{
						this.state.review.document_tone.tones.length == 0 
						?
							<View>		
								<ButtonCustom 
									title="Tone Analyser"
									onPress={ this.analyser.bind(this) }
								/>
								{ this.state.message ? 
									<View style={styles.message}>
										<Text style={styles.messageText}>
											Write a large text in English
										</Text>
									</View>
								: <View></View> }
							</View>
						:
							<View>
								{ this.state.review.sentences_tone.length == 0 
									? 
									<View>
										<Text style={styles.sentence}>{ this.state.pitch.text }</Text>
										<View style={styles.toneList}>
											{ this.state.review.document_tone.tones.map((tone, index) => 
												<Text style={styles.tone} key={index}>{tone.tone_name}</Text>
											)}
										</View>
									</View> 
									: 
									<View>
										{ this.state.review.sentences_tone.map((sentence, index) => 
											<View key={index}>
												<Text style={styles.sentenceNumber}>Sentence {index+1}:</Text>
												<View style={styles.sentenceBox}>
													<Text style={styles.sentence}>{sentence.text}</Text>
													{ sentence.tones.length > 0
														? 
														<View style={styles.toneList}>
															{ sentence.tones.map((tone, index) => 
																<Text style={styles.tone} key={index}>{tone.tone_name}</Text>
															)}
														</View>
														: 
														<View style={styles.toneList}>
															<Text style={styles.tone}>Undefined tone</Text>
														</View>
													}
												</View>
											</View>
										)}
									</View> 
								}
							</View>
					}
				</ScrollView>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
	pitch: {
		marginBottom: 20
	},
    text: {
        color: '#fff',
	},
	message: {
		backgroundColor: '#f39c12',
		padding: 10,
		marginTop: 10,
		marginBottom: 10,
	},
	messageText: {
		color: '#86560a'
	},
	sentenceNumber: {
		color: '#ffffff',
		marginBottom: 20
	},
	sentenceBox: {
		backgroundColor: '#073e67',
		padding: 10,
		marginBottom: 20
	},
	sentence: {
		color: '#ffffff',
		marginBottom: 10
	},
	toneList: {
		flexWrap: 'wrap', 
        alignItems: 'flex-start',
		flexDirection:'row',
		display: 'flex'
	},
	tone: {
		backgroundColor: '#fb1751',
		color: '#ffffff',
		borderRadius: 20,
		paddingTop: 0,
		paddingBottom: 1,
		paddingLeft: 10,
		paddingRight: 10,
		flexDirection:'column',
		marginRight: 10,
		minWidth: 50,
		textAlign: 'center'
	}
})