import React from 'react'
import { Alert, StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from 'react-native-firebase'

export default class Register extends React.Component {
    state = { email: '', password: '', confirmPasswords:'' }
    
    handleRegister = () => {
        if (!(/\S/.test(this.state.email)) || !(/\S/.test(this.state.password))) {
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

        if (this.state.password !== this.state.confirmPassword) {
            Alert.alert(
                'Passwords do not match!',
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
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
            Alert.alert(
                'Register Success!',
                'Your account is ready',
                [
                    {text: 'Cancel', onPress: () => { this.props.navigation.navigate('LogIn')}, style: 'cancel'},
                    {text: 'OK', onPress: () => { this.props.navigation.navigate('LogIn') }},
                ],
                { cancelable: false }
            )            
        })
        .catch((error) => {
            Alert.alert(
                'Register Fail!',
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
            <Text>Sign Up</Text>
            <TextInput
            placeholder="Email"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            />
            <TextInput
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            />
            <TextInput
            secureTextEntry
            placeholder="Confirm Password"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
            value={this.state.confirmPassword}
            />
            <Button title="Sign Up" onPress={this.handleRegister} />
            <Button
            title="Already have an account? Login"
            onPress={() => this.props.navigation.navigate('LogIn')}
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