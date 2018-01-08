import React, { Component } from 'react'

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Navigator,
    AsyncStorage,
    ActivityIndicator,
    Alert
} from 'react-native'

import { NavigationActions } from 'react-navigation';

import PropTypes from 'prop-types';

import appStyles from '../../app.style';
import loginStyles from './login.style';
import userStore from '../../store/userStore';
import { userLogin } from '../../store/userActions';

export class Login extends Component {
    static navigationOptions = {
        title: 'Sign In',
        headerTitleStyle: { alignSelf: 'center' },
    };

    constructor() {
        super();
        this.state = {
            loading: false,
            username: 'ryan',
            password: 'anything'
        }
    }

    signIn() {
        userStore.dispatch(userLogin(this.state.username));

        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: "Home"
                })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    register() {
        this.props.navigation.navigate("Register");
    }

    render() {
        return (
            <View style={appStyles.pageContainer}>
                <View style={appStyles.inputContainer}>
                    <Text>Username</Text>
                    <TextInput
                        style={appStyles.input}
                        onChangeText={(text) => this.setState({ username: text })}
                        value={this.state.username}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <View style={appStyles.inputContainer}>
                    <Text>Password</Text>
                    <TextInput
                        style={appStyles.input}
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password}
                        secureTextEntry={true}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <View style={appStyles.buttonContainer}>
                    <TouchableOpacity activeOpacity={.5}
                        onPress={this.signIn.bind(this)}>
                        <View style={appStyles.button}>
                            <Text style={appStyles.buttonText}>Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity testID="test-id-buttonSignUp" activeOpacity={.5}
                    onPress={this.register.bind(this)}>
                    <View>
                        <Text style={loginStyles.registerLink}>Register new account</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}