import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { SwitchNavigator } from 'react-navigation'
import firebase from 'react-native-firebase'
import Loading from './Loading'
import Register from './Register'
import LogIn from './LogIn'

class Account extends React.Component {

    state = { currentUser: null }

    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }

    render() {
        const { currentUser } = this.state
        return (
            <View style={styles.container}>
                <Text>
                    Hi {currentUser && currentUser.email}!
                </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})



const AccountManager = SwitchNavigator(
  {
    Loading,
    Register,
    LogIn,
    Account
  },
  {
    initialRouteName: 'Loading'
  }
)
export default AccountManager