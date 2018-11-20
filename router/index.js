import { createStackNavigator } from 'react-navigation'
import routes from './routes'

export default createStackNavigator(routes, {
    initialRouteName: 'Login',
    headerLayoutPreset: 'center',
    cardStyle: { 
        backgroundColor: '#051d38',
        // backgroundColor: '#123e6b',
        // backgroundColor: '#144679',
        // backgroundColor: '#164e86',
    },
    navigationOptions: {
        headerTitleStyle: {
            color: '#fff',
        },
        headerStyle: {
            borderBottomWidth: 0,
            // backgroundColor: '#0f345f',
            // backgroundColor: '#051d38',
            // backgroundColor: '#123e6b',
            // backgroundColor: '#144679',
            // backgroundColor: '#164e86',
            backgroundColor: '#073e67',
            elevation: 0,
        },
        headerTintColor: '#fff',
    }
})