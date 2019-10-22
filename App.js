import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppNavigator from './Navigator';


type Props = {};
export default class App extends Component<Props> {


  render() {
    //StatusBar.setBarStyle('light-content', true);
    return (

        <AppNavigator/>
    );
  }
}
