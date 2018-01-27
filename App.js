// @flow
import React, { Component } from 'react'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import { UIManager, Platform, StatusBar } from 'react-native'
import { composeWithDevTools } from 'redux-devtools-extension'

import MainNavigator from './src/navigators/MainNavigator'
import * as reducers from './src/redux'

export default class App extends Component<void> {
  componentDidMount() {
    if (Platform.OS === 'android') {
      // eslint-disable-next-line no-unused-expressions
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    }

    StatusBar.setHidden(true)
  }

  client = new ApolloClient({
    // link: new HttpLink({ uri: 'https://roommate-backend-staging.herokuapp.com/graphql' }),
    link: new HttpLink({ uri: 'http://localhost:3000/graphql' }),
    cache: new InMemoryCache()
  })

  render() {
    const store = createStore(combineReducers(reducers), composeWithDevTools())

    return (
      <ApolloProvider client={this.client}>
        <Provider store={store}>
          <MainNavigator />
        </Provider>
      </ApolloProvider>
    )
  }
}