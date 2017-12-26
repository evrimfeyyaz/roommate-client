import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'

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
  SvgIcon, TabBarItem, TabBar
} from '../../src/components'
import centerViewStyle from './CenterView/style'
import * as iconData from '../../assets/iconData'
import BackgroundCard from "../../src/components/Cards/BackgroundCard/BackgroundCard"

storiesOf('Welcome', module).add('to Storybook', () => <Welcome />)

storiesOf('Switch', module)
  .addDecorator(getStory => <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>)
  .add('regular', () => (
    <Switch backgroundColors={['#c1b296', '#998263']} />
  ))

storiesOf('Menu', module)
  .addDecorator(getStory => <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>)
  .add('item', () => (
    <SideMenuItem title="Home" id="home" iconData={iconData.home} />
  ))
  .add('item selected', () => (
    <SideMenuItem title="Home" id="home" iconData={iconData.home} isSelected />
  ))
  .add('full menu', () => (
    <SideMenu />
  ))

storiesOf('Button', module)
  .addDecorator(getStory => <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>)
  .add('primary', () => (
    <PrimaryButton title="Book a Table" onPress={action('primary-button-press')} />
  ))
  .add('secondary', () => (
    <SecondaryButton title="Wake-Up Alarm" onPress={action('secondary-button-press')} />
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

storiesOf('Cards', module)
  .addDecorator(getStory => <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>)
  .add('background', () => (
    <BackgroundCard style={{ width: 300, height: 300 }} />
  ))
  .add('item', () => (
    <ItemCard
      imageUri="https://static.pexels.com/photos/691077/pexels-photo-691077.jpeg"
      title="Mexican Omelet"
      description="Three eggs with cilantro, tomatoes, onions, avocados and melted Emmental cheese. With a side of roasted potatoes, and your choice of toast or croissant."
      price="$16"
    />
  ))

storiesOf('Icons', module)
  .addDecorator(getStory => <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>)
  .add('home', () => (
    <SvgIcon height={48} width={48} fill="#fff" iconData={iconData.home} />
  ))
  .add('food', () => (
    <SvgIcon height={48} width={48} fill="#fff" iconData={iconData.food} />
  ))

storiesOf('Tab bar', module)
  .addDecorator(getStory => <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>)
  .add('item', () => (
    <TabBarItem title="Restaurants" />
  ))
  .add('full', () => {
    const roomServiceItem = {
      title: 'Room Service',
      index: 0,
      key: 'room-service',
      onPress: () => {}
    }

    const restaurantsItem = {
      title: 'Restaurants',
      index: 1,
      key: 'restaurants',
      onPress: () => {}
    }

    const items = [roomServiceItem, restaurantsItem]

    return (
      <TabBar items={items} activeIndex={0} />
    )
  })