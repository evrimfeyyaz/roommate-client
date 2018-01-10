// @flow
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Title } from '../components/index'
import * as icons from '../../assets/iconData'

class HomeScreen extends Component<void> {
  static navigationOptions = {
    title: 'Home',
    iconData: icons.home
  }

  render() {
    return (
      <View style={styles.container}>
        <Title>
          Coming Soon
        </Title>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default HomeScreen