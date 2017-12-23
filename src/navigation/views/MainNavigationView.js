import React, { Component } from 'react'
import { View, Text, StatusBar } from 'react-native'
import styles from './styles'
import { SideMenu } from '../../components'

class MainNavigationView extends Component {
  componentDidMount() {
    StatusBar.setHidden(true)
  }

  render() {
    return (
      <View style={styles.container}>
        <SideMenu />
        <View style={{ flex: 1 }}>
          <Text>
            Test
          </Text>
        </View>
      </View>
    )
  }
}

export default MainNavigationView