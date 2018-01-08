import React, { Component } from 'react'
import PropTypes from 'prop-types';

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

import userStore from '../../store/userStore';

import appStyles from '../../app.style';
import homeStyles from './home.style';

export class Home extends Component {
    static navigationOptions = {
        title: 'Home',
        headerRight: <View />,
        headerTitleStyle: { alignSelf: 'center' },
    };

    constructor() {
        super();
        this.state = {
            loading: false,
            username: userStore.getState().user.username
        }
    }

    goToTransactionHistory() {
        this.props.navigation.navigate("History");
    }

    render() {
        return (
            <View style={appStyles.pageFlexContainer}>
                <View style={homeStyles.greetingsContainer}>
                    <Text style={homeStyles.greetingsText}>Welcome Back, <Text style={homeStyles.userName}>{this.state.username}</Text></Text>
                </View>
                <View style={homeStyles.contentContainer}>
                    <View>
                        <Text style={homeStyles.membershipDescription}>You have </Text>
                    </View>
                    <View>
                        <Text style={homeStyles.membershipPoints}>1000</Text>
                    </View>
                    <View>
                        <Text style={homeStyles.membershipDescription}>Membership Points</Text>
                    </View>
                    <View style={homeStyles.historyContainer}>
                        <TouchableOpacity activeOpacity={.5}
                            onPress={this.goToTransactionHistory.bind(this)}>
                            <View>
                                <Text style={homeStyles.historyLink}>See transaction History</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}