import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SimpleApp } from './app/navigation';
import firebase from 'firebase';

export default class App extends React.Component {
  componentWillMount(){
    firebase.initializeApp({
      apiKey: "AIzaSyCA7rdYp41hz8Fxm6Zi5cT2JQF64njQdMI",
      authDomain: "react-native-notif-poc.firebaseapp.com",
      databaseURL: "https://react-native-notif-poc.firebaseio.com",
      projectId: "react-native-notif-poc",
      storageBucket: "react-native-notif-poc.appspot.com",
      messagingSenderId: "894077278430"  
    });
  }

  render() {
    return <SimpleApp />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

