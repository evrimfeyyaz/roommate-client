// @flow
import React, { Component } from 'react'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
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

  render() {
    const uri = Platform.OS === 'android' ? 'http://10.0.2.2:3000/graphql' : 'http://localhost:3000/graphql'

    const client = new ApolloClient({
      // link: new HttpLink({ uri: 'https://roommate-backend-staging.herokuapp.com/graphql' }),
      link: new HttpLink({ uri }),
      cache: new InMemoryCache()
    })

    const store = createStore(combineReducers(reducers), composeWithDevTools(
      applyMiddleware(thunk)
    ))

    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <MainNavigator />
        </Provider>
      </ApolloProvider>
    )
  }
}