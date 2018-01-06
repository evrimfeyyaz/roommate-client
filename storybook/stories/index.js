import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'

import CenterView from './CenterView'
import Welcome from './Welcome'
import {
  Switch,
  SideMenuItem,
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
  TabBarItem,
  TabBar,
  NavigationBar,
  Card,
  ItemsInCategory,
  ItemDetails,
  Stepper,
  Cart,
  CircularButton
} from '../../src/components'
import centerViewStyle from './CenterView/style'
import * as icons from '../../assets/iconData'
import colors from '../../src/config/colors'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3000/graphql' }),
  cache: new InMemoryCache()
})

// TODO: Add below decorators as global decorators.

storiesOf('Welcome', module).add('to Storybook', () => <Welcome />)

storiesOf('Switch', module)
  .addDecorator(getStory => <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>)
  .addDecorator(withKnobs)
  .add('regular', () => (
    <Switch
      onTitle="On"
      offTitle="Off"
      style={{ width: 180 }}
      onPress={action('switch-tap')}
      value={boolean('Value', true)}
    />
  ))

storiesOf('Menu', module)
  .addDecorator(getStory => <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>)
  .add('item', () => (
    <SideMenuItem title="Home" id="home" iconData={icons.home} />
  ))
  .add('item selected', () => (
    <SideMenuItem title="Home" id="home" iconData={icons.home} isSelected />
  ))
  .add('full menu', () => (
    <SideMenu />
  ))

storiesOf('Typography', module)
  .addDecorator(getStory => <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>)
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

storiesOf('Top bar', module)
  .addDecorator(getStory => <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>)
  .add('regular', () => (
    <TopBar title="Home" />
  ))

storiesOf('Icons', module)
  .addDecorator(getStory => <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>)
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
  .add('pen', () => (
    <SvgIcon height={48} width={48} fill="#fff" stroke="#fff" strokeWidth={1} iconData={icons.pen} />
  ))

storiesOf('Tab bar', module)
  .addDecorator(getStory => <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>)
  .add('active item', () => (
    <TabBarItem title="Restaurants" id="0" key="tab-bar-item" onPress={action('tab-bar-item-tap')} isActive />
  ))
  .add('inactive item', () => (
    <TabBarItem title="Restaurants" id="0" key="tab-bar-item" onPress={action('tab-bar-inactive-item-tap')} />
  ))
  .add('small active item', () => (
    <TabBarItem
      title="Restaurants"
      id="0"
      key="tab-bar-item"
      onPress={action('tab-bar-small-item-tap')}
      isActive
      small
    />
  ))
  .add('small inactive item', () => (
    <TabBarItem
      title="Restaurants"
      id="0"
      key="tab-bar-item"
      onPress={action('tab-bar-small-inactive-item-tap')}
      small
    />
  ))
  .add('full', () => {
    const roomServiceItem = {
      title: 'Room Service',
      id: '0'
    }

    const restaurantsItem = {
      title: 'Restaurants',
      id: '1'
    }

    const items = [roomServiceItem, restaurantsItem]

    return (
      <TabBar data={items} onTabChange={action('tab-change')} />
    )
  })
  .add('small full', () => {
    const roomServiceItem = {
      title: 'Recommended',
      id: '0',
      key: 'recommended',
      onPress: action('recommended-item-tap')
    }

    const restaurantsItem = {
      title: 'Breakfast',
      id: '1',
      key: 'breakfast',
      onPress: action('breakfast-item-tap')
    }

    const items = [roomServiceItem, restaurantsItem]

    return (
      <TabBar data={items} onTabChange={action('tab-change')} small />
    )
  })

storiesOf('Navigation bar', module)
  .addDecorator(getStory => <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>)
  .add('full', () => (
    <NavigationBar onBackButtonPress={action('back-button-tap')} title="Room Service" />
  ))

// TODO: Mock the data instead of getting it from the local host.
// storiesOf('Room service', module)
//   .addDecorator(getStory => (
//     <ApolloProvider client={client}>
//       <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>
//     </ApolloProvider>
//   ))
//   .add('items in category', () => (
//     <ItemsInCategory id="962967c5-dcd2-4eff-b4a9-0bc17707c0f0" />
//   ))

storiesOf('Shopping', module)
  .addDecorator(getStory => <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>)
  .add('item card', () => (
    <ItemCard
      item={{
        id: 'some-item-id',
        title: 'Mexican Omelet',
        description: 'Three eggs with cilantro, tomatoes, onions, avocados and melted Emmental cheese. With a ' +
        'side of roasted potatoes, and your choice of toast or croissant.',
        price: '16'
      }}
    />
  ))
  .add('item details', () => {
    const item = {
      id: 'sample-id',
      title: 'Baked Dijon Salmon',
      description: 'Fresh Norwegian salmon, lightly brushed with our herbed Dijon mustard sauce,' +
      ' with choice of two sides.',
      price: '32'
    }

    return (
      <ItemDetails
        item={item}
        style={{ width: '80%', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
      />
    )
  })
  .add('cart', () => {
    const cartItem1 = {
      item: {
        id: 'sample-id-1',
        title: 'Baked Dijon Salmon',
        description: 'Fresh Norwegian salmon, lightly brushed with our herbed Dijon mustard sauce,' +
        ' with choice of two sides.',
        price: '32'
      },
      quantity: 1
    }

    const cartItem2 = {
      item: {
        id: 'sample-id-2',
        title: 'Tiramisu',
        description: 'Creamy mascarpone cheese and custard layered between espresso and rum soaked house-made ' +
        'ladyfingers, topped with Valrhona cocoa powder.',
        price: '15'
      },
      quantity: 2
    }

    return <Cart cartItems={[cartItem1, cartItem2]} />
  })

storiesOf('Controls', module)
  .addDecorator(getStory => <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>)
  .add('stepper', () => {
    return <Stepper minValue={1} />
  })
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
      iconFill={colors.circularButtonIcon}
    />
  ))
  .add('circular button (small)', () => (
    <CircularButton
      onPress={action('circular-button-press')}
      iconData={icons.plus}
      iconFill={colors.circularButtonIcon}
      small
    />
  ))
  .add('circular button (disabled)', () => (
    <CircularButton
      onPress={action('circular-button-press')}
      iconData={icons.plus}
      iconFill={colors.circularButtonIcon}
      disabled
    />
  ))

storiesOf('Miscellaneous', module)
  .addDecorator(getStory => <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>)
  .add('background', () => (
    <Card style={{ width: 300, height: 300 }} />
  ))