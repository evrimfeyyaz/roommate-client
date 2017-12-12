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
  Heading3
} from '../../src/components/common'
import {
  PrimaryButton,
  SecondaryButton,
  TopBar
} from '../../src/components'

import centerViewStyle from './CenterView/style'
import icons from '../../assets/icons'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome />)

storiesOf('Switch', module)
  .addDecorator(getStory => <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>)
  .add('regular', () => (
    <Switch tint={['#c1b296', '#998263']} />
  ))

storiesOf('Menu', module)
  .addDecorator(getStory => <CenterView style={centerViewStyle.dark}>{getStory()}</CenterView>)
  .add('item', () => (
    <SideMenuItem title="Home" id="home" iconSvgPath={icons.test} />
  ))
  .add('item selected', () => (
    <SideMenuItem title="Home" id="home" iconSvgPath={icons.test} isSelected />
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