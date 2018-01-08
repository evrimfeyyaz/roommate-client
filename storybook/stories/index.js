import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { withKnobs, boolean, select, number } from '@storybook/addon-knobs/react'

import CenterView from './CenterView'
import {
  Switch,
  SideMenu,
  Title,
  Heading,
  Heading2,
  Heading3,
  ItemCard,
  PrimaryButton,
  SecondaryButton,
  TopBar,
  SvgIcon,
  TabBar,
  NavigationBar,
  Card,
  ItemsInCategory,
  ItemDetails,
  Stepper,
  Cart,
  CircularButton
} from '../../src/components'
import * as icons from '../../assets/iconData'
import colors from '../../src/config/colors'
import type { SideMenuRoute } from '../../src/components/navigation/SideMenu'


/**
 * SAMPLE DATA
 */

// TabBar
const tabData = [{
  title: 'Room Service',
  id: '0'
}, {
  title: 'Restaurants',
  id: '1'
}]
const tabIds = tabData.map(tab => tab.id)

// SideMenu
const routes: SideMenuRoute[] = [
  {
    title: 'Home',
    routeKey: 'home-route',
    iconData: icons.home
  },
  {
    title: 'Food',
    routeKey: 'food-route',
    iconData: icons.food
  }
]
const routeKeys = routes.map(route => route.routeKey)

// Shopping
const shoppingItem1 = {
  id: 'item-1-id',
  title: 'Mexican Omelet',
  description: 'Three eggs with cilantro, tomatoes, onions, avocados and melted Emmental cheese. With a ' +
  'side of roasted potatoes, and your choice of toast or croissant.',
  price: '16'
}

const shoppingItem2 = {
  id: 'sample-id-2',
  title: 'Tiramisu',
  description: 'Creamy mascarpone cheese and custard layered between espresso and rum soaked house-made ' +
  'ladyfingers, topped with Valrhona cocoa powder.',
  price: '15'
}

const shoppingCartItem1 = {
  id: 'shopping-cart-item-1-id',
  item: shoppingItem1,
  quantity: 1
}

const shoppingCartItem2 = {
  id: 'shopping-cart-item-2-id',
  item: shoppingItem2,
  quantity: 2
}

/**
 * APOLLO
 */

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3000/graphql' }),
  cache: new InMemoryCache()
})

/**
 * GLOBAL DECORATORS
 */

addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
addDecorator(withKnobs)

/**
 * STORIES
 */

storiesOf('Typography', module)
  .add('title', () => (
    <Title>Page Title</Title>
  ))
  .add('heading', () => (
    <Heading>Heading</Heading>
  ))
  .add('heading 2', () => (
    <Heading2>Heading 2</Heading2>
  ))
  .add('heading 3', () => (
    <Heading3>Heading 3</Heading3>
  ))

storiesOf('Icons', module)
  .add('home', () => (
    <SvgIcon height={48} width={48} fill="#fff" iconData={icons.home} />
  ))
  .add('food', () => (
    <SvgIcon height={48} width={48} fill="#fff" iconData={icons.food} />
  ))
  .add('left arrow', () => (
    <SvgIcon height={48} width={48} fill="#fff" stroke="#fff" strokeWidth={1} iconData={icons.leftArrow} />
  ))
  .add('minus', () => (
    <SvgIcon height={48} width={48} fill="#fff" stroke="#fff" strokeWidth={1} iconData={icons.minus} />
  ))
  .add('plus', () => (
    <SvgIcon height={48} width={48} fill="#fff" stroke="#fff" strokeWidth={1} iconData={icons.plus} />
  ))

storiesOf('Navigation', module)
  .add('navigation bar', () => (
    <NavigationBar onBackButtonPress={action('back-button-tap')} title="Room Service" />
  ))
  .add('side menu', () => (
    <SideMenu
      routes={routes}
      activeRouteKey={select('Active Route', routeKeys, routeKeys[0])}
      sideMenuItemTapped={action('side-menu-item-tap')}
    />
  ))
  .add('top bar', () => (
    <TopBar title="Home" />
  ))
  .add('tab bar', () => (
    <TabBar
      data={tabData}
      onTabPress={action('tab-press')}
      activeTabId={select('Active Tab', tabIds, tabIds[0])}
    />
  ))
  .add('tab bar (small)', () => (
    <TabBar
      data={tabData}
      onTabPress={action('tab-press')}
      activeTabId={select('Active Tab', tabIds, tabIds[0])}
      small
    />
  ))

storiesOf('Shopping', module)
  .add('item card', () => (
    <ItemCard item={shoppingItem1} />
  ))
  .add('item details', () => (
    <ItemDetails
      item={shoppingItem1}
      style={{ width: '80%' }}
      onCloseButtonPress={action('item-details-close-button-press')}
      onAddButtonPress={action('item-details-add-button-press')}
    />
  ))
  .add('cart', () => (
    <Cart
      cartItems={[shoppingCartItem1, shoppingCartItem2]}
      cartTotal="$100"
      onClearButtonPress={action('cart-clear-button-press')}
      onReviewButtonPress={action('cart-review-button-press')}
      onQuantityStepperPress={action('cart-quantity-stepper-press')}
      onRemoveButtonPress={action('cart-remove-button-press')}
    />
  ))

storiesOf('Controls', module)
  .add('stepper', () => (
    <Stepper minValue={1} value={number('Stepper value', 1)} onButtonPress={action('stepper-button-press')} />
  ))
  .add('primary button', () => (
    <PrimaryButton
      title="Book a Table"
      onPress={action('primary-button-press')}
    />
  ))
  .add('secondary button', () => (
    <SecondaryButton
      title="Wake-Up Alarm"
      onPress={action('secondary-button-press')}
      iconData={icons.alarmClock}
    />
  ))
  .add('circular button', () => (
    <CircularButton
      onPress={action('circular-button-press')}
      iconData={icons.plus}
    />
  ))
  .add('circular button (small)', () => (
    <CircularButton
      onPress={action('circular-button-press')}
      iconData={icons.plus}
      small
    />
  ))
  .add('circular button (disabled)', () => (
    <CircularButton
      onPress={action('circular-button-press')}
      iconData={icons.plus}
      disabled
    />
  ))
  .add('switch', () => (
    <Switch
      onTitle="On"
      offTitle="Off"
      style={{ width: 180 }}
      onPress={action('switch-tap')}
      value={boolean('Value', true)}
    />
  ))

storiesOf('Miscellaneous', module)
  .add('background', () => (
    <Card style={{ width: 300, height: 300 }} />
  ))