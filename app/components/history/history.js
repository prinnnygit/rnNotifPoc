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

import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import appStyles from '../../app.style';
import historyStyles from './history.style';

import { transactionData } from './dummyData';

import { TransactionRow } from './transactionRow';

const Rx = require('rx');

export class History extends Component {
    static navigationOptions = {
        title: 'Transaction History',
        headerRight: <View />,
        headerTitleStyle: { alignSelf: 'center' },
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            startDate: '',
            minDatePicker: moment().subtract(3, 'months').format('YYYY-MM-DD'),
            maxDatePicker: moment().format('YYYY-MM-DD'),
            transactionData: transactionData,
            searchData: []
        }
    }

    onStartDateChanged(date) {
        var dataClone = [...this.state.transactionData];
        var filteredData = dataClone.filter((item) => moment(item.transactionDate).isAfter(moment(date)));
        this.setState({ startDate: date, searchData: filteredData });
    }

    renderSearchResultHeader() {
        if (this.state.searchData.length > 0) {
            return (
                <View style={historyStyles.headerContainer}>
                    <View style={historyStyles.headerRow}>
                        <View style={historyStyles.rowColumn}>
                            <Text style={historyStyles.headerText}>Transaction No.</Text>
                        </View>
                        <View style={[historyStyles.rowColumn, historyStyles.borderSeparator]}>
                            <Text style={historyStyles.headerText}>Date</Text>
                        </View>
                        <View style={historyStyles.rowColumn}>
                            <Text style={historyStyles.headerText}>Value</Text>
                        </View>
                    </View>
                </View>
            );
        }
        else if (this.state.startDate != '') {
            return (
                <Text style={historyStyles.noTransactionText}>No Transaction found</Text>
            )
        }
    }

    render() {
        const searchResultHeader = this.renderSearchResultHeader();
        return (
            <View style={appStyles.pageFlexContainerPure}>
                <View style={historyStyles.filterContainer}>
                    <Text>Set Start Date (Max. 3 months)</Text>
                    <DatePicker
                        style={{ width: '100%' }}
                        date={this.state.startDate}
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
                        onDateChange={(date) => this.onStartDateChanged(date)}
                    />
                </View>
                {searchResultHeader}
                <ScrollView style={historyStyles.listContainer}>
                    <FlatList
                        data={this.state.searchData}
                        renderItem={(item) => <TransactionRow key={item.id} transaction={item} />}
                    >
                    </FlatList>
                </ScrollView>
            </View>
        );
    }
}