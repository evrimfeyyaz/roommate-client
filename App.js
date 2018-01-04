/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'

import MainNavigator from './src/navigation/navigators/MainNavigator'
import * as reducers from './src/redux'

export default class App extends Component {
  client = new ApolloClient({
    link: new HttpLink({ uri: 'https://roommate-backend-staging.herokuapp.com/graphql' }),
    cache: new InMemoryCache()
  })

  render() {
    const store = createStore(combineReducers(reducers))

    return (
      <ApolloProvider client={this.client}>
        <Provider store={store}>
          <MainNavigator />
        </Provider>
      </ApolloProvider>
    )
  }
}