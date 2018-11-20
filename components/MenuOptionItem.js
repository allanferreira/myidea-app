import React from 'react'
import { View, Text, Modal, TouchableHighlight, StyleSheet } from 'react-native'
import Container from '../components/Container'

export default class MenuOptionItem extends React.Component {

    constructor(props) {
        super(props)

        this.closeModal = this.closeModal.bind(this)

        this.state = {
          item: props.item,
          visible: props.visible,
        }
    }

    componentWillReceiveProps(props) {
      this.setState({ ...props })
    }

    closeModal() {
      this.setState({ visible: false })
    }

    render() {
        return (
          <Modal
              onRequestClose={() => console.log('Modal has been closed.')}
              animationType="fade"
              transparent={true}
              visible={this.state.visible}
          >
            <View style={styles.flex}>
              <TouchableHighlight
                style={styles.background}
                onPress={ this.closeModal }
              >
                <View></View>
              </TouchableHighlight>
              <View style={styles.menu}>
                <Container>
                  <Text>Editar</Text>
                </Container>
                <Container>
                  <Text>Deletar</Text>
                </Container>
              </View>
            </View>
            
          </Modal>
        )
    }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#000',
    opacity: .2,
    flex: 1,  
  },
  menu: {
    backgroundColor: '#fff',
  },
  flex: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
  }
})