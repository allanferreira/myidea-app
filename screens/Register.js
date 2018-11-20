import React from 'react'
import TextInputCustom from '../components/TextInputCustom'
import ButtonCustom from '../components/ButtonCustom'
import Container from '../components/Container'
import Alert from '../components/Alert'
import api from '../services/api'

export default class Register extends React.Component {

  static navigationOptions = { 
    title: 'Register',
  }

  constructor(props) {
    super(props)
    this.state = {
      messageSuccess: '',
      messageError: '',
      buttonDisabled: false,
      name: '',
      email: '',
      password: '',
    }
  }

  registerHandler() {

    this.setState({ buttonDisabled: true })

    api
      .register({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      })
      .then(user => this.setState({ messageSuccess: 'Registered user' }))
      .catch(error => this.setState({ messageError: 'Email already used' }))
      .then(result => this.setState({ 
        buttonDisabled: false,
        name: '',
        email: '',
        password: '',
      }))

  }

  inputHandler(key, value) {
    this.setState({ 
      [key]: value, 
      messageSuccess: '' ,
      messageError: '',
    })
  }

  render() {
    return (
      <Container>
        <Alert 
          status='success' 
          value={ this.state.messageSuccess }
          />
        <Alert 
          status='error' 
          value={ this.state.messageError }
          />
        <TextInputCustom 
          placeholder="Name" 
          value={ this.state.name } 
          onChangeText={ this.inputHandler.bind(this, 'name') }
          />
        <TextInputCustom 
          placeholder="Email" 
          keyboardType="email-address"
          value={ this.state.email } 
          onChangeText={ this.inputHandler.bind(this, 'email') }
          />
        <TextInputCustom 
          placeholder="Password" 
          secureTextEntry={ true }
          value={ this.state.password } 
          onChangeText={ this.inputHandler.bind(this, 'password') }
          />
        <ButtonCustom 
          title="Register" 
          disabled={ this.state.buttonDisabled }
          onPress={ this.registerHandler.bind(this) }
          />
      </Container>
    )
  }
}