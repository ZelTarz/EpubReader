import React from 'react'
import { Alert, StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from 'react-native-firebase'

export default class LogIn extends React.Component {
  state = { email: '', password: '' }

  handleLogin = () => {
    const { email, password } = this.state;

    if (!(/\S/.test(email)) || !(/\S/.test(password))) {
      Alert.alert(
          'Username and password are not valid!',
          '',                
          [
              {text: 'OK', onPress: () => { console.log('OK Pressed') }},
          ],
          { cancelable: false }
      )
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert(
          'Loged In',
          '',
          [
              {text: 'OK', onPress: () => { this.props.navigation.navigate('Account') }},
          ],
          { cancelable: false }
      ) 
      })
      .catch((error) => {
        Alert.alert(
          'Log In Fail',
          error.message,
          [
              {text: 'OK', onPress: () => { console.log('OK Pressed') }},
          ],
          { cancelable: false }
        )
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('Register')}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})