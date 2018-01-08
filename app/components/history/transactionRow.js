import React, { Component } from 'react'

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Navigator,
    AsyncStorage,
    ActivityIndicator,
    Alert
} from 'react-native'

import historyStyles from './history.style';

export class TransactionRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={historyStyles.rowContainer}>
                <View style={historyStyles.rowColumn}>
                    <Text>{this.props.transaction.item.id}</Text>
                </View>
                <View style={historyStyles.rowColumn}>
                    <Text>{this.props.transaction.item.transactionDate}</Text>
                </View>
                <View style={historyStyles.rowColumn}>
                    <Text>{this.props.transaction.item.value}</Text>
                </View>
            </View>
        );
    }
}