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
            maxDatePicker: moment().format('YYYY-MM-DD')
        }
    }

    getSearchResult(){
        if(this.state.startDate === ''){
            return [];
        }
        else {
            return transactionData.filter((item) => {
                var itemDateSplit = item.transactionDate.split('-');
                var itemDate = new Date(itemDateSplit[0], itemDateSplit[1], itemDateSplit[2]);
                var startDateSplit = this.state.startDate.split('-');
                var startDate = new Date(startDateSplit[0], startDateSplit[1], startDateSplit[2]);
                return itemDate >= startDate;
            });
        }
    }

    renderSearchResultHeader(searchResult) {
        if (searchResult.length > 0) {
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
        var searchResult = this.getSearchResult();
        var searchResultHeader = this.renderSearchResultHeader(searchResult);
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
                        onDateChange={(date) => this.setState({ startDate : date})}
                    />
                </View>
                {searchResultHeader}
                <ScrollView style={historyStyles.listContainer}>
                    <FlatList
                        data={searchResult}
                        renderItem={(item) => <TransactionRow transaction={item} />}
                    >
                    </FlatList>
                </ScrollView>
            </View>
        );
    }
}