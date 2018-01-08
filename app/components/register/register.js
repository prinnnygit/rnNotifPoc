import React, { Component } from 'react'
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Picker,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Navigator,
    AsyncStorage,
    ActivityIndicator,
    Alert
} from 'react-native'

import userStore from '../../store/userStore';

import appStyles from '../../app.style';
import registerStyles from './register.style';
import registerStyle from './register.style';
var PushNotification = require('react-native-push-notification');

PushNotification.configure({
    onRegister: function(token) {
        console.log( 'TOKEN:', token );
    },
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );

        // process the notification
        
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    senderID: "YOUR GCM SENDER ID",
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },
    popInitialNotification: true,
    requestPermissions: true,
});

export class Register extends Component {
    static navigationOptions = {
        title: 'Register',
        headerRight: <View />,
        headerTitleStyle: { alignSelf: 'center' },
    };

    constructor() {
        super();
        this.state = {
            loading: false,
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            minDatePicker: '1900-01-01',
            maxDatePicker: moment().format('YYYY-MM-DD'),
            gender: 'Male',
            mobileNumber: '',
            emailAddress: '',
            address: ''
        }
    }

    createNewAccount() {
        PushNotification.localNotification({
            title: "Verify your account",
            message: "Verify your registration by clicking here"
        });

        Alert.alert("Success", "Account created", [
            { text: 'OK', onPress: () => this.props.navigation.goBack() },
        ], { cancelable: false })
    }

    render() {
        return (
            <ScrollView style={appStyles.pageContainer}>
                <View style={appStyles.inputContainer}>
                    <Text>Username</Text>
                    <TextInput
                        style={appStyles.input}
                        onpress={() => this.focus()}
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
                <View style={[appStyles.inputContainer, registerStyles.splitContainer]}>
                    <View style={registerStyles.flexItem}>
                        <Text>Firstname</Text>
                        <TextInput
                            style={appStyles.input}
                            onpress={() => this.focus()}
                            onChangeText={(text) => this.setState({ firstName: text })}
                            value={this.state.firstName}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={[registerStyles.flexItem, registerStyles.lastName]}>
                        <Text>Lastname</Text>
                        <TextInput
                            style={appStyles.input}
                            onpress={() => this.focus()}
                            onChangeText={(text) => this.setState({ lastName: text })}
                            value={this.state.lastName}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                </View>
                <View style={[appStyles.inputContainer, registerStyles.splitContainer]}>
                    <View style={registerStyle.flexItem}>
                        <Text>Date of Birth</Text>
                        <DatePicker
                            style={{ width: '100%' }}
                            date={this.state.dateOfBirth}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate={this.state.minDatePicker}
                            maxDate={this.state.maxDatePicker}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36,
                                    backgroundColor: '#ffffff',
                                }
                            }}
                            onDateChange={(date) => { this.setState({ dateOfBirth: date }) }}
                        />
                    </View>
                    <View style={[registerStyle.flexItem, registerStyles.lastName]}>
                        <Text>Gender</Text>
                        <Picker
                            selectedValue={this.state.gender}
                            onValueChange={(itemValue, itemIndex) => this.setState({ gender: itemValue })}>
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                        </Picker>
                    </View>
                </View>
                <View style={[appStyles.inputContainer]}>
                    <Text>Mobile Number</Text>
                    <TextInput
                        style={appStyles.input}
                        placeholder="+62xxx..."
                        onChangeText={(text) => this.setState({ mobileNumber: text })}
                        value={this.state.mobileNumber}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <View style={appStyles.inputContainer}>
                    <Text>Email Address</Text>
                    <TextInput
                        style={appStyles.input}
                        onChangeText={(text) => this.setState({ emailAddress: text })}
                        value={this.state.emailAddress}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <View style={appStyles.inputContainer}>
                    <Text>Address</Text>
                    <TextInput
                        style={appStyles.input}
                        onChangeText={(text) => this.setState({ address: text })}
                        value={this.state.address}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <View style={appStyles.buttonContainer}>
                    <TouchableOpacity activeOpacity={.5}
                        onPress={this.createNewAccount.bind(this)}>
                        <View style={appStyles.button}>
                            <Text style={appStyles.buttonText}>Register</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}