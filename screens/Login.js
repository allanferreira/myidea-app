import React from 'react'
import { Text, StyleSheet } from 'react-native'
import TextInputCustom from '../components/TextInputCustom'
import ButtonCustom from '../components/ButtonCustom'
import Container from '../components/Container'
import Alert from '../components/Alert'
import api from '../services/api'

export default class Login extends React.Component {

  static navigationOptions = { 
    title: 'Login',
  }

  constructor(props) {
    super(props)
    this.state = {
      message: '',
      buttonDisabled: false,
      email: '',
      password: '',
    }
  }

  loginHandler() {

    this.setState({ buttonDisabled: true })

    api
      .login({
        email: this.state.email,
        password: this.state.password,
      })
      .then(user => this.props.navigation.push('Pitches', user.data))
      .catch(error => this.setState({ message: 'Email or password is incorrect' }))
      .then(result => this.setState({ buttonDisabled: false }))

  }

  inputHandler(key, value) {
    this.setState({ 
      [key]: value, 
      message: '' 
    })
  }

  goToRegister() {
    this.props.navigation.push('Register')
  }

  render() {
    return (
      <Container>
        <Alert 
          status='error' 
          value={ this.state.message }
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
          title="Login" 
          disabled={ this.state.buttonDisabled }
          onPress={ this.loginHandler.bind(this) }
          />
        <Text style={ styles.text }>or</Text>
        <ButtonCustom 
          title="Register"
          status="success"
          onPress={ this.goToRegister.bind(this) }
          />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
  }
})